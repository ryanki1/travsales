using System.Web;
using System.Web.Mvc;

namespace AddCon_TravellingSalesman
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}