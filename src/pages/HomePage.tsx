import TableRow from "../components/TableRow";
import {
  alarabiyaBreakingNewsEndpoint,
  aljazeeraBreakingNewsEndpoint,
  aljazeeraNewsEndpoint,
  alqahiraNewsEndpoint,
  CNNNewsEndpoint,
  MTVLebanonNewsEndpoint,
  skyNewsBreakingNewsEndpoint,
} from "../endpoints/endpoints";
import useGetData from "../hooks/useGetData";
import { AlarabiyaBreakingNews } from "../models/AlarabiyaBreakingNews";
import { AljazeeraBreakingNews } from "../models/AljazeeraBreakingNews";
import { AljazeeraNews } from "../models/AljazeeraNews";
import { AlqahiraNews } from "../models/AlqahiraNews";
import { CNNNews } from "../models/CNNNews";
import { MTVLebanonNews } from "../models/MTVLebanonNews";
import { SkyNewsBreakingNews } from "../models/SkyNewsBreakingNews";

const HomePage = () => {
  // SYRIA TV - ALARABIYA - BBC
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
    isLoading: isLoadingSkyNewsBreakingNews,
    error: errorSkyNewsBreakingNews,
    data: dataSkyNewsBreakingNews,
  } = useGetData<SkyNewsBreakingNews>(skyNewsBreakingNewsEndpoint);

  const {
    isLoading: isLoadingMTVLebanonNews,
    error: errorMTVLebanonNews,
    data: dataMTVLebanonNews,
  } = useGetData<MTVLebanonNews>(MTVLebanonNewsEndpoint);

  const {
    isLoading: isLoadingAlqahiraNews,
    error: errorAlqahiraNews,
    data: dataAlqahiraNews,
  } = useGetData<AlqahiraNews>(alqahiraNewsEndpoint);

  const {
    isLoading: isLoadingCNNNews,
    error: errorCNNNews,
    data: dataCNNNews,
  } = useGetData<CNNNews>(CNNNewsEndpoint);

  const filteredMTVLebanonNews = dataMTVLebanonNews
    ? dataMTVLebanonNews.articles.filter(
        (article) => FILTERS.test(article.name) // Using a regular expression to match any of the keywords
      )
    : [];

  const filteredCNNNews = dataCNNNews
    ? dataCNNNews.data.list.items.filter(
        (article) => FILTERS.test(article.title) // Using a regular expression to match any of the keywords
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

          {isLoadingSkyNewsBreakingNews ? (
            <TableRow breaking name="Sky News" news="" />
          ) : errorSkyNewsBreakingNews ? (
            <TableRow breaking name="Sky News" news="" />
          ) : dataSkyNewsBreakingNews ? (
            dataSkyNewsBreakingNews.map((item, index) => (
              <TableRow breaking key={index} name="Sky News" news={item.text} />
            ))
          ) : (
            <TableRow breaking name="Sky News" news="" />
          )}

          {isLoadingAljazeeraNews ? (
            <TableRow name="الجزيرة" news="" />
          ) : errorAljazeeraNews ? (
            <TableRow name="الجزيرة" news="" />
          ) : dataAljazeeraNews ? (
            filteredAljazeeraNews.map((item, index) => (
              <TableRow
                key={index}
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
              <TableRow
                key={index}
                name="MTV Lebanon"
                news={item.name}
                extraNews={item.description}
              />
            ))
          ) : (
            <TableRow name="MTV Lebanon" news="" />
          )}

          {isLoadingCNNNews ? (
            <TableRow name="CNN Arabia" news="" />
          ) : errorCNNNews ? (
            <TableRow name="CNN Arabia" news="" />
          ) : dataCNNNews ? (
            filteredCNNNews.map((item, index) => (
              <TableRow key={index} name="CNN Arabia" news={item.title} />
            ))
          ) : (
            <TableRow name="CNN Arabia" news="" />
          )}

          {isLoadingAlqahiraNews ? (
            <TableRow name="القاهرة" news="" />
          ) : errorAlqahiraNews ? (
            <TableRow name="القاهرة" news="" />
          ) : dataAlqahiraNews ? (
            dataAlqahiraNews.data.posts.map((item, index) => (
              <TableRow key={index} name="القاهرة" news={item.title} />
            ))
          ) : (
            <TableRow name="القاهرة" news="" />
          )}
        </tbody>
      </table>
    </main>
  );
};

export default HomePage;
