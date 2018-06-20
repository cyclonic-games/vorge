            POWERED BY
      __   _  ____    ____   ____    ____
      ||  // //  \\  //  \\ //  \\  //  \\
      || // //   // //     //   // //___//
      ||// //   // //     //   // //
      |//  \\__// //      \\__//  \\__//
                             //
                        \\__//  (c) 2018 Cyclonic Games


Extensible/Modular, Event-Driven, 2D, Multiplayer,
Entity/Component/System-Powered JavaScript Game Engine

### `// INSTALL`

We do not publish our packages on any package managers; as long as your package
manager supports github, you're good to go. For NPM, use the following command:

```shell
npm install cyclonic-games/vorge --save #requires git to be installed
```

### `// HOW TO`

Once you've installed vorge, simply import it into your working script, like so:

```javascript
import Game from 'vorge/core/Game';
```

Once you have it imported, you're ready to get making your game!

```javascript
const game = new Game('My Game Title');

game.subscribe('play').forEach(() => {
    console.log('game is being played');
});

game.play();
```
