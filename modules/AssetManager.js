const Module = require('quantum/core/Module');

module.exports = class AssetManager extends Module {

    constructor (host) {
        super(host);

        this.cache = new Map();
        this.queue = new Set();

        this.audios = new Map();
        this.images = new Map();
        this.videos = new Map();

        this.unknown = new Map();
    }

    download (filename) {

        if (this.cache.has(filename)) switch (this.cache.get(filename)) {
            case 'image': return Promise.resolve(this.images.get(filename));
            case 'audio': return Promise.resolve(this.audios.get(filename));
            case 'video': return Promise.resolve(this.videos.get(filename));
            default: return Promise.resolve(this.unknown.get(filename));
        }

        for (const download of this.queue) if (download.filename === filename) {
            return download.request;
        }

        const fetch = this[ Module.host ].connection.fetch.bind(this[ Module.host ].connection);
        const download = new AssetManager.Download(filename, this);

        this.queue.add(download);

        return new Promise((resolve, reject) => {
            download.start(fetch).then(asset => {
                resolve(asset);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    manage (download) {
        const { binary, filename, type } = download;

        this.cache.set(filename, type);
        this.queue.delete(download);

        return new Promise(resolve => {
            switch (type) {
                case 'image': {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.src = URL.createObjectURL(binary);
                    this.images.set(filename, image);
                }
                case 'audio': {
                    const audio = new Audio(URL.createObjectURL(binary));
                    audio.oncanplay = () => resolve(audio);
                    this.audios.set(filename, audio);

                    return audio;
                }
                case 'video': {
                    const video = document.createElement('video');
                    video.oncanplay = () => resolve(video);
                    video.src = Url.createObjectURL(binary);
                    this.videos.set(filename, video);

                    return video;
                }
                default: {
                    this.unknown.set(filename, binary);
                    resolve(binary);
                }
            }
        });
    }
}

module.exports.Download = class AssetManagerDownload {

    constructor (filename, manager) {
        this.binary = null;
        this.filename = filename;
        this.kind = 'download';
        this.manager = manager;
        this.loaded = 0;
        this.request = null;
        this.size = 0;
        this.type = 'unknown';
    }

    start (fetch) {
        return this.request = fetch(`assets/${ this.filename }`).then(response => {
            const contentLength = response.headers.get('content-length');
            const contentType = response.headers.get('content-type');
            const reader = response.body.getReader();

            this.size = Number(contentLength);
            this.type = contentType.match(/(.+?)\//)[ 1 ];

            return new Response(
                new ReadableStream({ start: controller => this.read(reader, controller) })
            );
        })
        .then(response => response.blob())
        .then(binary => {
            this.binary = binary;
            this.loaded = this.size;

            return this.manager.manage(this);
        });
    }

    read (reader, controller) {
        reader.read().then(stream => {

            if (stream.done) {
                return controller.close();
            }

            this.loaded += stream.value.byteLength;

            this.manager.emit('progress', [ this ]);
            controller.enqueue(stream.value);
            this.read(reader, controller);
        });
    }
}
