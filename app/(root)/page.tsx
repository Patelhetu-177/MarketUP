import { Button } from "@/components/ui/button";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  INDIAN_MARKET_DATA_WIDGET_CONFIG,
  INDIAN_MARKET_OVERVIEW_WIDGET_CONFIG,
} from "@/lib/constants";
import IndianMarketNews from "@/components/IndianMarketNews";
import { getIndianMarketNews } from "@/lib/indianMarketNews";

const Home = async () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  const news = await getIndianMarketNews();

  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={INDIAN_MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>

        <div className="md-col-span xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <IndianMarketNews initialNews={news} />
        </div>

        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={INDIAN_MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;