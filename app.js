class ProxyPopup {

    constructor() {

        const [ set, clear ] = document.querySelectorAll('button')

        this._element = { set, clear }

    }

    run() {

        this.get()

        this._element.set.onclick = _ => this.set(this.proxy())
        this._element.clear.onclick = _ => this.clear()

    }

    noti = message => document.querySelector('p').innerText = typeof message === 'object' ? JSON.stringify(message) : message

    proxy = () => {

        const [ scheme, host, port ] = Array.from(document.querySelectorAll('input')).map(e => e.value)

        return { scheme, host, port : parseInt(port) }

    }

    set = proxy => {

        const value = { 
            mode: 'fixed_servers',
            rules: {
                proxyForHttp: proxy
            }
        }

        chrome.proxy.settings.set({ value, scope: 'regular' }, this.get)

    }

    clear = () => chrome.proxy.settings.clear({}, this.get)

    get = () => chrome.proxy.settings.get({}, this.noti)

}

const proxyPopup = new ProxyPopup()

proxyPopup.run()