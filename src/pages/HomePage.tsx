import TableRow from "../components/TableRow";
import {
  alarabiyaBreakingNewsEndpoint,
  aljazeeraBreakingNewsEndpoint,
  aljazeeraNewsEndpoint,
  MTVLebanonNewsEndpoint,
} from "../endpoints/endpoints";
import useGetData from "../hooks/useGetData";
import { AlarabiyaBreakingNews } from "../models/AlarabiyaBreakingNews";
import { AljazeeraBreakingNews } from "../models/AljazeeraBreakingNews";
import { AljazeeraNews } from "../models/AljazeeraNews";
import { MTVLebanonNews } from "../models/MTVLebanonNews";

const HomePage = () => {
  // SYRIA TV - ALARABIYA
  const FILTERS =
    /سوري|حلب|حماة|حماه|لاذقية|لاذقيه|طرطوس|دمشق|حسكة|حسكه|قامشلي/;

  const {
    isLoading: isLoadingAljazeeraBreakingNews,
    error: errorAljazeeraBreakingNews,
    data: dataAljazeeraBreakingNews,
  } = useGetData<AljazeeraBreakingNews>(aljazeeraBreakingNewsEndpoint);

  const {
    isLoading: isLoadingAljazeeraNews,
    error: errorAljazeeraNews,
    data: dataAljazeeraNews,
  } = useGetData<AljazeeraNews>(aljazeeraNewsEndpoint);

  const {
    isLoading: isLoadingAlarabiyaBreakingNews,
    error: errorAlarabiyaBreakingNews,
    data: dataAlarabiyaBreakingNews,
  } = useGetData<AlarabiyaBreakingNews>(alarabiyaBreakingNewsEndpoint);

  const {
    isLoading: isLoadingMTVLebanonNews,
    error: errorMTVLebanonNews,
    data: dataMTVLebanonNews,
  } = useGetData<MTVLebanonNews>(MTVLebanonNewsEndpoint);

  const filteredMTVLebanonNews = dataMTVLebanonNews
    ? dataMTVLebanonNews.articles.filter(
        (article) => FILTERS.test(article.name) // Using a regular expression to match any of the keywords
      )
    : [];

  const filteredAljazeeraNews = dataAljazeeraNews
    ? [
        ...(dataAljazeeraNews.data.homepage.feedPost || []),
        ...(dataAljazeeraNews.data.homepage.automatedCollection?.flatMap(
          (collection) => collection.posts || []
        ) || []),
        ...(dataAljazeeraNews.data.homepage.curatedCollection?.flatMap(
          (collection) => collection.posts || []
        ) || []),
      ]
        .filter((post) => FILTERS.test(post.excerpt)) // Filter based on the keywords
        .map((post) => post) // Get the excerpts
    : [];

  return (
    <main dir="rtl">
      <table className="table">
        <tbody>
          <TableRow
            breaking
            name="العربية"
            news={
              isLoadingAlarabiyaBreakingNews
                ? ""
                : errorAlarabiyaBreakingNews
                ? ""
                : dataAlarabiyaBreakingNews
                ? dataAlarabiyaBreakingNews.message
                : ""
            }
          />

          <TableRow
            breaking
            name="الجزيرة"
            news={
              isLoadingAljazeeraBreakingNews
                ? ""
                : errorAljazeeraBreakingNews
                ? ""
                : dataAljazeeraBreakingNews
                ? dataAljazeeraBreakingNews.data.breakingNews.tickerText || ""
                : ""
            }
          />
          {isLoadingAljazeeraNews ? (
            <TableRow name="الجزيرة" news="" />
          ) : errorAljazeeraNews ? (
            <TableRow name="الجزيرة" news="" />
          ) : dataAljazeeraNews ? (
            filteredAljazeeraNews.map((item, index) => (
              <TableRow
                key={index}
                more
                name="الجزيرة"
                news={item.title}
                extraNews={item.excerpt}
              />
            ))
          ) : (
            <TableRow name="الجزيرة" news="" />
          )}

          {isLoadingMTVLebanonNews ? (
            <TableRow name="MTV Lebanon" news="" />
          ) : errorMTVLebanonNews ? (
            <TableRow name="MTV Lebanon" news="" />
          ) : dataMTVLebanonNews ? (
            filteredMTVLebanonNews.map((item, index) => (
              <TableRow key={index} name="MTV Lebanon" news={item.name} />
            ))
          ) : (
            <TableRow name="MTV Lebanon" news="" />
          )}
        </tbody>
      </table>
    </main>
  );
};

export default HomePage;
