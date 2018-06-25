const Module = require('../core/Module');

module.exports = class AssetManager extends Module {

    constructor (name, game) {
        super(name, game);

        this.stream = new Set();

        this.audios = new Map();
        this.images = new Map();
        this.unknown = new Map();
        this.videos = new Map();
    }

    download (filename) {
        const fetch = this.game.connection.fetch.bind(this.game.connection);
        const download = new AssetManager.Download(filename, this);

        this.stream.add(download);

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

        this.stream.delete(download);

        switch (type) {
            case 'image': {
                const image = new Image();
                image.onload = () => this.emit('complete', [ download ])
                image.src = URL.createObjectURL(binary);
                this.images.set(filename, image);

                return image;
            }
            case 'audio': {
                const audio = new Audio(URL.createObjectURL(binary));
                audio.onload = () => this.emit('complete', [ download ]);
                this.audios.set(filename, audio);

                return audio;
            }
            case 'video': {
                const video = document.createElement('video');
                video.onload = () => this.emit('complete', [ download ]);
                video.src = Url.createObjectURL(binary);
                this.videos.set(filename, video);

                return video;
            }
            default: {
                this.unknown.set(filename, binary);
            }
        }
    }
}

module.exports.Download = class AssetManagerDownload {

    constructor (filename, manager) {
        this.binary = null;
        this.filename = filename;
        this.kind = 'download';
        this.manager = manager;
        this.loaded = 0;
        this.size = 0;
        this.type = 'unknown';
    }

    start (fetch) {
        return fetch(`assets/${ this.filename }`).then(response => {
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
