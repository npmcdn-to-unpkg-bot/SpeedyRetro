using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SpeedyRetro.Startup))]

namespace SpeedyRetro
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();

            ConfigureAuth(app);
        }
    }
}
