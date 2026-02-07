export const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/search", label: "Search" },
  { href: "/watchlist", label: "Watchlist" },
];

// Sign-up form select options
export const INVESTMENT_GOALS = [
  { value: "Growth", label: "Growth" },
  { value: "Income", label: "Income" },
  { value: "Balanced", label: "Balanced" },
  { value: "Conservative", label: "Conservative" },
];

export const RISK_TOLERANCE_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const PREFERRED_INDUSTRIES = [
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Energy", label: "Energy" },
  { value: "Consumer Goods", label: "Consumer Goods" },
];

export const ALERT_TYPE_OPTIONS = [
  { value: "upper", label: "Upper" },
  { value: "lower", label: "Lower" },
];

export const CONDITION_OPTIONS = [
  { value: "greater", label: "Greater than (>)" },
  { value: "less", label: "Less than (<)" },
];

export const MARKET_OVERVIEW_WIDGET_CONFIG = {
  colorTheme: "dark", // dark mode
  dateRange: "12M", // last 12 months
  locale: "en", // language
  largeChartUrl: "", // link to a large chart if needed
  isTransparent: true, // makes background transparent
  showFloatingTooltip: true, // show tooltip on hover
  plotLineColorGrowing: "#0FEDBE", // line color when price goes up
  plotLineColorFalling: "#0FEDBE", // line color when price falls
  gridLineColor: "rgba(240, 243, 250, 0)", // grid line color
  scaleFontColor: "#DBDBDB", // font color for scale
  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)", // fill under line when growing
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)", // fill under line when falling
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
  symbolActiveColor: "rgba(15, 237, 190, 0.05)", // highlight color for active symbol
  tabs: [
    {
      title: "Financial",
      symbols: [
        { s: "NYSE:JPM", d: "JPMorgan Chase" },
        { s: "NYSE:WFC", d: "Wells Fargo Co New" },
        { s: "NYSE:BAC", d: "Bank Amer Corp" },
        { s: "NYSE:HSBC", d: "Hsbc Hldgs Plc" },
        { s: "NYSE:C", d: "Citigroup Inc" },
        { s: "NYSE:MA", d: "Mastercard Incorporated" },
      ],
    },
    {
      title: "Technology",
      symbols: [
        { s: "NASDAQ:AAPL", d: "Apple" },
        { s: "NASDAQ:GOOGL", d: "Alphabet" },
        { s: "NASDAQ:MSFT", d: "Microsoft" },
        { s: "NASDAQ:FB", d: "Meta Platforms" },
        { s: "NYSE:ORCL", d: "Oracle Corp" },
        { s: "NASDAQ:INTC", d: "Intel Corp" },
      ],
    },
    {
      title: "Services",
      symbols: [
        { s: "NASDAQ:AMZN", d: "Amazon" },
        { s: "NYSE:BABA", d: "Alibaba Group Hldg Ltd" },
        { s: "NYSE:T", d: "At&t Inc" },
        { s: "NYSE:WMT", d: "Walmart" },
        { s: "NYSE:V", d: "Visa" },
      ],
    },
  ],
  support_host: "https://www.tradingview.com", // TradingView host
  backgroundColor: "#141414", // background color
  width: "100%", // full width
  height: 600, // height in px
  showSymbolLogo: true, // show logo next to symbols
  showChart: true, // display mini chart
};

export const INDIAN_MARKET_OVERVIEW_WIDGET_CONFIG = {
  colorTheme: "dark",
  dateRange: "12M",
  locale: "en",
  largeChartUrl: "",
  isTransparent: true,
  showFloatingTooltip: true,

  plotLineColorGrowing: "#0FEDBE",
  plotLineColorFalling: "#0FEDBE",
  gridLineColor: "rgba(240, 243, 250, 0)",
  scaleFontColor: "#DBDBDB",

  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",

  symbolActiveColor: "rgba(15, 237, 190, 0.05)",

  tabs: [
    {
      title: "Banking",
      symbols: [
        { s: "BSE:HDFCBANK", d: "HDFC Bank" },
        { s: "BSE:ICICIBANK", d: "ICICI Bank" },
        { s: "BSE:SBIN", d: "State Bank of India" },
        { s: "BSE:AXISBANK", d: "Axis Bank" },
        { s: "BSE:KOTAKBANK", d: "Kotak Mahindra Bank" },
        { s: "BSE:INDUSINDBK", d: "IndusInd Bank" },
      ],
    },
    {
      title: "IT",
      symbols: [
        { s: "BSE:TCS", d: "Tata Consultancy Services" },
        { s: "BSE:INFY", d: "Infosys" },
        { s: "BSE:HCLTECH", d: "HCL Technologies" },
        { s: "BSE:WIPRO", d: "Wipro" },
        { s: "BSE:TECHM", d: "Tech Mahindra" },
        { s: "BSE:LTIM", d: "LTIMindtree" },
      ],
    },
    {
      title: "Energy & FMCG",
      symbols: [
        { s: "BSE:RELIANCE", d: "Reliance Industries" },
        { s: "BSE:ONGC", d: "ONGC" },
        { s: "BSE:ITC", d: "ITC" },
        { s: "BSE:HINDUNILVR", d: "Hindustan Unilever" },
        { s: "BSE:NESTLEIND", d: "Nestle India" },
        { s: "BSE:TATACONSUM", d: "Tata Consumer Products" },
      ],
    },
    {
      title: "Core Economy",
      symbols: [
        { s: "BSE:LT", d: "Larsen & Toubro" },
        { s: "BSE:BHARTIARTL", d: "Bharti Airtel" },
        { s: "BSE:ASIANPAINT", d: "Asian Paints" },
        { s: "BSE:MARUTI", d: "Maruti Suzuki" },
        { s: "BSE:ULTRACEMCO", d: "UltraTech Cement" },
      ],
    },
  ],

  support_host: "https://www.tradingview.com",
  backgroundColor: "#141414",
  width: "100%",
  height: 600,
  showSymbolLogo: true,
  showChart: true,
};


export const HEATMAP_WIDGET_CONFIG = {
  dataSource: "SENSEX",
  blockSize: "market_cap_basic",
  blockColor: "change",
  grouping: "sector",
  isTransparent: true,
  locale: "en",
  symbolUrl: "",
  colorTheme: "dark",
  exchanges: [],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: "100%",
  height: "600",
};

export const TOP_STORIES_WIDGET_CONFIG = {
  displayMode: "regular",
  feedMode: "market",
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  market: "stock",
  width: "100%",
  height: "600",
};

export const MARKET_DATA_WIDGET_CONFIG = {
  title: "Stocks",
  width: "100%",
  height: 600,
  locale: "en",
  showSymbolLogo: true,
  colorTheme: "dark",
  isTransparent: false,
  backgroundColor: "#0F0F0F",
  symbolsGroups: [
    {
      name: "Financial",
      symbols: [
        { name: "NYSE:JPM", displayName: "JPMorgan Chase" },
        { name: "NYSE:WFC", displayName: "Wells Fargo Co New" },
        { name: "NYSE:BAC", displayName: "Bank Amer Corp" },
        { name: "NYSE:HSBC", displayName: "Hsbc Hldgs Plc" },
        { name: "NYSE:C", displayName: "Citigroup Inc" },
        { name: "NYSE:MA", displayName: "Mastercard Incorporated" },
      ],
    },
    {
      name: "Technology",
      symbols: [
        { name: "NASDAQ:AAPL", displayName: "Apple" },
        { name: "NASDAQ:GOOGL", displayName: "Alphabet" },
        { name: "NASDAQ:MSFT", displayName: "Microsoft" },
        { name: "NASDAQ:FB", displayName: "Meta Platforms" },
        { name: "NYSE:ORCL", displayName: "Oracle Corp" },
        { name: "NASDAQ:INTC", displayName: "Intel Corp" },
      ],
    },
    {
      name: "Services",
      symbols: [
        { name: "NASDAQ:AMZN", displayName: "Amazon" },
        { name: "NYSE:BABA", displayName: "Alibaba Group Hldg Ltd" },
        { name: "NYSE:T", displayName: "At&t Inc" },
        { name: "NYSE:WMT", displayName: "Walmart" },
        { name: "NYSE:V", displayName: "Visa" },
      ],
    },
  ],
};

export const INDIAN_MARKET_DATA_WIDGET_CONFIG = {
  title: "Indian Stocks",
  width: "100%",
  height: 600,
  locale: "en",
  showSymbolLogo: true,
  colorTheme: "dark",
  isTransparent: false,
  backgroundColor: "#0F0F0F",

  symbolsGroups: [
    {
      name: "Banking",
      symbols: [
        { name: "BSE:HDFCBANK", displayName: "HDFC Bank" },
        { name: "BSE:ICICIBANK", displayName: "ICICI Bank" },
        { name: "BSE:SBIN", displayName: "State Bank of India" },
        { name: "BSE:AXISBANK", displayName: "Axis Bank" },
        { name: "BSE:KOTAKBANK", displayName: "Kotak Mahindra Bank" },
      ],
    },
    {
      name: "IT",
      symbols: [
        { name: "BSE:TCS", displayName: "Tata Consultancy Services" },
        { name: "BSE:INFY", displayName: "Infosys" },
        { name: "BSE:WIPRO", displayName: "Wipro" },
        { name: "BSE:HCLTECH", displayName: "HCL Technologies" },
        { name: "BSE:TECHM", displayName: "Tech Mahindra" },
      ],
    },
    {
      name: "Energy & FMCG",
      symbols: [
        { name: "BSE:RELIANCE", displayName: "Reliance Industries" },
        { name: "BSE:ONGC", displayName: "ONGC" },
        { name: "BSE:ITC", displayName: "ITC" },
        { name: "BSE:HINDUNILVR", displayName: "Hindustan Unilever" },
        { name: "BSE:NESTLEIND", displayName: "Nestle India" },
      ],
    },
    {
      name: "Core Nifty 50 Stocks",
      symbols: [
        { name: "BSE:LT", displayName: "Larsen & Toubro" },
        { name: "BSE:BHARTIARTL", displayName: "Bharti Airtel" },
        { name: "BSE:ASIANPAINT", displayName: "Asian Paints" },
        { name: "BSE:MARUTI", displayName: "Maruti Suzuki" },
        { name: "BSE:ULTRACEMCO", displayName: "UltraTech Cement" },
      ],
    },
    {
      name: "Auto & Manufacturing",
      symbols: [
        { name: "BSE:MARUTI", displayName: "Maruti Suzuki" },
        { name: "BSE:M&M", displayName: "Mahindra & Mahindra" },
        { name: "BSE:EICHERMOT", displayName: "Eicher Motors" },
      ],
    },
    {
      name: "Infra, Metals & Core",
      symbols: [
        { name: "BSE:LT", displayName: "Larsen & Toubro" },
        { name: "BSE:ULTRACEMCO", displayName: "UltraTech Cement" },
        { name: "BSE:TATASTEEL", displayName: "Tata Steel" },
        { name: "BSE:JSWSTEEL", displayName: "JSW Steel" },
        { name: "BSE:HINDALCO", displayName: "Hindalco" },
        { name: "BSE:GRASIM", displayName: "Grasim Industries" },
      ],
    },
    {
      name: "Telecom & Utilities",
      symbols: [
        { name: "BSE:BHARTIARTL", displayName: "Bharti Airtel" },
        { name: "BSE:POWERGRID", displayName: "Power Grid Corp" },
        { name: "BSE:NTPC", displayName: "NTPC" },
      ],
    },
  ],
};


export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: true,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 1,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: false,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 10,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 400,
  interval: "1h",
  largeChartUrl: "",
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 464,
  displayMode: "regular",
  largeChartUrl: "",
});

export const POPULAR_STOCK_SYMBOLS = [
  // Tech Giants (the big technology companies)
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "ORCL",
  "CRM",

  // Growing Tech Companies
  "ADBE",
  "INTC",
  "AMD",
  "PYPL",
  "UBER",
  "ZOOM",
  "SPOT",
  "SQ",
  "SHOP",
  "ROKU",

  // Newer Tech Companies
  "SNOW",
  "PLTR",
  "COIN",
  "RBLX",
  "DDOG",
  "CRWD",
  "NET",
  "OKTA",
  "TWLO",
  "ZM",

  // Consumer & Delivery Apps
  "DOCU",
  "PTON",
  "PINS",
  "SNAP",
  "LYFT",
  "DASH",
  "ABNB",
  "RIVN",
  "LCID",
  "NIO",

  // International Companies
  "XPEV",
  "LI",
  "BABA",
  "JD",
  "PDD",
  "TME",
  "BILI",
  "DIDI",
  "GRAB",
  "SE",
];

export const POPULAR_INDIAN_STOCK_SYMBOLS = [
  // Large-Cap Market Leaders
  "BSE:RELIANCE",
  "BSE:TCS",
  "BSE:HDFCBANK",
  "BSE:ICICIBANK",
  "BSE:INFY",
  "BSE:SBIN",
  "BSE:HINDUNILVR",
  "BSE:ITC",
  "BSE:LT",
  "BSE:BHARTIARTL",

  // Banking & Financial Services
  "BSE:AXISBANK",
  "BSE:KOTAKBANK",
  "BSE:INDUSINDBK",
  "BSE:BAJFINANCE",
  "BSE:BAJAJFINSV",
  "BSE:HDFCLIFE",
  "BSE:SBILIFE",
  "BSE:ICICIPRULI",
  "BSE:CHOLAFIN",
  "BSE:PNB",

  // IT & Tech Companies
  "BSE:HCLTECH",
  "BSE:WIPRO",
  "BSE:TECHM",
  "BSE:LTIM",
  "BSE:MPHASIS",
  "BSE:PERSISTENT",
  "BSE:COFORGE",
  "BSE:TATAELXSI",
  "BSE:OFSS",
  "BSE:KPITTECH",

  // FMCG & Consumer Brands
  "BSE:NESTLEIND",
  "BSE:DABUR",
  "BSE:BRITANNIA",
  "BSE:MARICO",
  "BSE:GODREJCP",
  "BSE:TATACONSUM",
  "BSE:COLPAL",
  "BSE:UBL",
  "BSE:VBL",
  "BSE:MCDOWELL_N",

  // Auto & EV
  "BSE:MARUTI",
  "BSE:TATAMOTORS",
  "BSE:M&M",
  "BSE:BAJAJ_AUTO",
  "BSE:EICHERMOT",
  "BSE:TVSMOTOR",
  "BSE:ASHOKLEY",
  "BSE:HEROMOTOCO",
  "BSE:OLA",
  "BSE:ATHERENERGY",

  // New-Age / High-Growth Companies
  "BSE:ZOMATO",
  "BSE:PAYTM",
  "BSE:NYKAA",
  "BSE:POLICYBZR",
  "BSE:DELHIVERY",
  "BSE:IREDA",
  "BSE:IRFC",
  "BSE:LICI",
  "BSE:ADANIENT",
  "BSE:ADANIPORTS",
];


export const NO_MARKET_NEWS =
  '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">No market news available today. Please check back tomorrow.</p>';

export const WATCHLIST_TABLE_HEADER = [
  "Company",
  "Symbol",
  "Price",
  "Change",
  "Market Cap",
  "P/E Ratio",
  "Alert",
  "Action",
];
