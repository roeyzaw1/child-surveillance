from mitmproxy import proxy, options
from mitmproxy.tools.dump import DumpMaster

class AddHeader:
    def request(self, flow):
        if flow.request.pretty_host == "example.org":
            flow.request.host = "mitmproxy.org"

def start():
    myaddon = AddHeader()
    opts = options.Options(listen_host='0.0.0.0', listen_port=8080, mode='transparent', confdir='/home/user/.mitmproxy')
    pconf = proxy.config.ProxyConfig(opts)
    m = DumpMaster(opts)
    m.server = proxy.server.ProxyServer(pconf)
    m.addons.add(myaddon)

    try:
        m.run()
    except KeyboardInterrupt:
        m.shutdown()

start()
