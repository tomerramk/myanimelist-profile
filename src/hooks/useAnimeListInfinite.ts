import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

import useProfileStore from "@features/profile/useProfileStore";

const useAnimeListInfinite = (status: string) => {
	const { username } = useProfileStore();

	return useInfiniteQuery({
		queryKey: ["animeListInfinite", { status }],
		queryFn: async ({ pageParam = 1 }) => {
			const url = `http://localhost:8080/api/users/animelist/${username}?limit=25&page=${pageParam}${
				status !== "all" ? `&status=${status}` : ""
			}`;
			try {
				const { data } = await axios.get(url);
				return data;
			} catch (error) {
				throw new Error("Failed to fetch anime list");
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});
};

export default useAnimeListInfinite;
