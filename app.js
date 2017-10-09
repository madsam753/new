let App = {

    topBar: {
        'File': [ 'New', 'Open', 'Save' ],
        'Edit': [ 'Option1', 'Option2' ],
        'Help': [ 'Manual', 'About' ]
    },

    init() {
        this.createContextMenu();
        this.createTopBar();
        this.bindEvents();
    },

    createContextMenu() {
        let contextMenu = document.createElement('div');
        contextMenu.className = 'app-contextMenu app-hidden';
        document.getElementById('app').appendChild(contextMenu);
    },

    createTopBar() {
        let container = document.getElementById('app');
        container.className = 'app';

        let topBar = document.createElement('div');
        topBar.className = 'app-topBar';
        container.appendChild(topBar);

        for (let b in this.topBar){
            let button = document.createElement('button');
            button.className = 'app-barButton';
            button.innerHTML = b;
            button.onclick = () => {
                this.loadContextMenu(button);
            };
            topBar.appendChild(button);
        }
    },

    bindEvents() {
        let app = document.getElementById('app');
        app.onclick = (e) => {
            let contextMenu = document.getElementsByClassName('app-contextMenu')[0];
            // If context menu is not hidden
            if (contextMenu.className === 'app-contextMenu') {
                let pos = contextMenu.getBoundingClientRect();
                // If click outside context menu
                if (e.clientX < pos.left || e.clientX > (pos.left+pos.width) || 
                    e.clientY < pos.top || e.clientY > (pos.top+pos.height)) {
                    contextMenu.className += ' app-hidden';
                }
            }
        };
    },

    loadContextMenu(b) {
        console.log('Loading "' + b.innerHTML + '" context menu');
        let bList = this.topBar[b.innerHTML];
        let contextMenu = document.getElementsByClassName('app-contextMenu')[0];
        contextMenu.innerHTML = '';
        contextMenu.className = 'app-contextMenu';
        for (let i=0; i<bList.length; ++i) {
            let button = document.createElement('button');
            button.className = 'app-barContextButton';
            button.innerHTML = bList[i];
            button.onclick = () => {
                this.execAction(bList[i]);
            }
            contextMenu.appendChild(button);
        }
        let bPos = b.getBoundingClientRect();
        contextMenu.style = 'left: ' + bPos.left + 'px; top: ' + bPos.top + 'px;';
    },

    execAction(action) {
        console.log('Executing action "' + action + '"');
    }

};