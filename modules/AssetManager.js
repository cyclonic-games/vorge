const Module = require('../core/Module');

module.exports = class AssetManager extends Module {

    constructor (name, game) {
        super(name, game);

        this.audios = new Map();
        this.images = new Map();
        this.unknown = new Map();
        this.videos = new Map();
    }

    connect (game) {
        game.subscribe('download', 'start').forEach(method => this.download(method.arguments[ 0 ]));
        game.subscribe('download', 'complete').forEach(method => this.manage(method.arguments[ 0 ]));
    }

    download (filename) {
        new AssetManager.Download(filename, this.game).start();
    }

    manage (download) {
        const { binary, filename, type } = download;

        switch (type) {
            case 'image': {
                const image = new Image();
                image.src = URL.createObjectURL(binary);
                this.images.set(filename, image);
                break;
            }
            case 'audio': {
                const audio = new Audio(URL.createObjectURL(binary));
                this.audios.set(filename, audio);
                break;
            }
            case 'video': {
                const video = document.createElement('video');
                video.src = Url.createObjectURL(binary);
                this.videos.set(filename, video);
                break;
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

    start () {
        const address = `${ this.manager.settings.get('server.address') }/assets/${ this.filename }`;

        fetch(address).then(response => {
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

            this.manager.emit('download', 'complete', [ this ]);
        });
    }

    read (reader, controller) {
        reader.read().then(stream => {

            if (stream.done) {
                return controller.close();
            }

            this.loaded += stream.value.byteLength;

            controller.enqueue(stream.value);

            this.manager.emit('download', 'progress', [ this ]).default(() => {
                this.read(reader, controller);
            });
        });
    }
}
