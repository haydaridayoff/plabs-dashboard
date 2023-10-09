import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (
  initialPage: number,
  initialLimit: number,
  initialTotalPage: number,
  initialTotalData: number,
  limitString?: string,
  pageString?: string,
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const handleAddSetParam = (param: string, value: string) => {
    if (searchParams.has(param)) {
      searchParams.set(param, value);
    } else {
      searchParams.append(param, value);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  let limitParam = searchParams.get(limitString ?? "limit");
  let pageParam = searchParams.get(pageString ?? "page");

  const isLimitParamValid =
    limitParam && !isNaN(parseInt(limitParam)) && parseInt(limitParam) > 0
      ? true
      : false;
  const isPageParamValid =
    pageParam && !isNaN(parseInt(pageParam)) && parseInt(pageParam) > 0
      ? true
      : false;

  const [page, setPage] = useState(
    isPageParamValid ? parseInt(pageParam!) : initialPage,
  );

  const [limit, setLimit] = useState(
    isLimitParamValid ? parseInt(limitParam!) : initialLimit,
  );

  const [totalPage, setTotalPage] = useState(initialTotalPage);
  const [totalData, setTotalData] = useState(initialTotalData);

  useEffect(() => {
    let limitParam = searchParams.get(limitString ?? "limit");
    let pageParam = searchParams.get(pageString ?? "page");

    if (isLimitParamValid) {
      setLimit(parseInt(limitParam!));
    }
    if (isPageParamValid) {
      setPage(parseInt(pageParam!));
    }
  }, []);

  useEffect(() => {
    handleAddSetParam(limitString ?? "limit", limit.toString());
    handleAddSetParam(pageString ?? "page", page.toString());
  }, [page, limit]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  return {
    page,
    limit,
    totalPage,
    totalData,
    nextPage,
    prevPage,
    setPage,
    setLimit,
    setTotalData,
    setTotalPage,
  };
};
