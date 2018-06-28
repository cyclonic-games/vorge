```
          POWERED BY
    __   _  ____    ____   ____    ____
    ||  // //  \\  //  \\ //  \\  //  \\
    || // //   // //     //   // //___//
    ||// //   // //     //   // //
    |//  \\__// //      \\__//  \\__//
                           //
                      \\__//
```
**Extensible/Modular, Event-Driven, Multiplayer, Entity/Component/System-Powered JavaScript Game Engine**

---

#### **What is it exactly?**
The tagline says it all, if not too much. Vorge is built to be focused around ECS and event-driven programming. With WebSockets for networking, and WebGL for rendering, Vorge is fast and powerful enough for most projects (especially for 4:3 2D online RPGs).

---

#### **What are the features?**
Before I list them out, it's important to understand how Vorge works. The basic idea is to create a high-throughput application scaffolding that allows for several ways of customization. Vorge ships with some basic, common functionality in the shape of **Modules**, **Libraries**, and **Plugins**, but Vorge itself is just designed to handle data flow and communication between moving parts (including client <-> server).

##### **Modules**
Vorge modules are essentially core blocks of logic that make up the majority of the internal logic of the engine. You can replace existing modules or create entirely new ones that add unique functionality.

##### **Libraries**
With an Entity/Component/System architecture, managing all of these objects can become difficult. Libraries in Vorge consist of prebuilt entities, components, and systems that you can reference in your modules, other libraries, or plugins.

##### **Plugins**
These are simple; want to run some code when the game is instantiated. This allows you to subscribe to events, swap modules, communicate with the server, among many other things.

---

#### **But seriously, what are the features?**
- High-ish throughput networking via WebSockets
- High-ish performance graphics via WebGL
- 100% Web compatible, meaning completely cross-platform
- Event Driven; hook into the engine's event system and react to engine internals
- Entity/Component/System -- look it up, it's all the rage
- Flexible customization toolkit
- Git-based package management
- Open Source & 100% Free
- TBD

---

#### **But does it have pets system?**
The basic functionality that vorge ships with is enough to get a simple online RPG up and running. I will be working on my own game while I polish up the engine, and all of the modules, libraries, and plugins that I develop for my game I will release as open source for you to use in your games. This means that yes, if someone writes you the plugin, Vorge can support a pets system, and so much more.

##### **Future Planned Features**
- Particles (render beautiful particles)
- Electron (run your game as a desktop app)
- Offline (make a single player game)
- Discord (integrate with discord and its api)
- Web-based administration panel for the server
- TBD

---

#### **Does it come with editors?**
Yes, it will! I want to bake the engine and server out, work on the git-based package management, then jump right into developing the editors/creation suite. It will also be JavaScript and probably run on Electron.

##### **Future Planned Features**
- Extensions (Make your own tools!)
- Tile Map Editor
- UI Designer
- TBD

---

#### **Screenshots**
None yet. I know.

Vorge is actually decently far along in production, but the focus has been lower level internals. There's not a whole lot to show, visually, but you should check out the code in this repository.
