using ByteMobileApp.ViewModels;
using ByteMobileApp.Views;
using Prism.Ioc;
using Prism.Modularity;

namespace ByteMobileApp
{
    public class ByteMobileAppModule : IModule
    {
        public void OnInitialized(IContainerProvider containerProvider)
        {

        }

        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterForNavigation<ViewA, ViewAViewModel>();
        }
    }
}
