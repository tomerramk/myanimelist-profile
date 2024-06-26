import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import AnimeList from "@components/AnimeList/AnimeList";
import AnimeTabs from "@components/AnimeList/AnimeTabs";

import useAnimeListStore from "@features/anime-list/useAnimeListStore";

import useAnimeListInfinite from "@hooks/useAnimeListInfinite";
import Sidebar from "@components/Sidebar/Sidebar";

const AnimeListPage: React.FC = () => {
	const { animeTab, setAnimeList } = useAnimeListStore();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useAnimeListInfinite(animeTab);

	const fetchedAnimeCount =
		data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

	useEffect(() => {
		setAnimeList(data?.pages.flatMap((page) => page.data) || []);
	}, [data, setAnimeList]);

	return (
		<>
			<Sidebar />
			<div className="flex h-full w-full flex-col pr-3">
				<div className="col-span-full mt-4">
					<AnimeTabs selectedStatus={animeTab}></AnimeTabs>
				</div>
				<InfiniteScroll
					dataLength={fetchedAnimeCount}
					next={() => fetchNextPage()}
					hasMore={!!hasNextPage}
					loader={
						isFetchingNextPage ? (
							<h4 className="text-center text-lg font-bold ">Loading...</h4>
						) : null
					}
				>
					<AnimeList />
				</InfiniteScroll>
			</div>
		</>
	);
};

export default AnimeListPage;
