import Banner from "./components/Banner";
import Card from "./components/Card";
import CatalogTile from "./components/CatalogTile";
import Counter from "./components/Counter";
import EnhancedDataTable from "./components/EnhancedDataTable";
import ErrorBoundary from "./components/ErrorBoundary";
import MediaGallery from "./components/MediaGallery";
import MiniOrderSummarySidePanel from "./components/MiniOrderSummarySidePanel";
import OrderSummaryV2 from "./components/OrderSummaryV2";
import PageHeader from "./components/PageHeader";
import SideNav from "./components/SideNav";
import SidePanel from "./components/SidePanel";
import Status from "./components/Status";
import Tag from "./components/Tag";
import TagList from "./components/TagList";

const components = {
  Banner,
  Card,
  CatalogTile,
  Counter,
  EnhancedDataTable,
  ErrorBoundary,
  MediaGallery,
  MiniOrderSummarySidePanel,
  OrderSummaryV2,
  PageHeader,
  SideNav,
  SidePanel,
  Status,
  Tag,
  TagList,
};

const retrieveLanguage = (lng) =>
  Object.entries(components).reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val[lng] }),
    {}
  );

const langauges = [
  "en",
  "de",
  "es",
  "fr",
  "it",
  "ja",
  "ko",
  "pt_br",
  "zh_cn",
  "zh_tw",
];

const resources = langauges.reduce(
  (acc, val) => ({ ...acc, [val]: retrieveLanguage(val) }),
  {}
);

export default resources;
