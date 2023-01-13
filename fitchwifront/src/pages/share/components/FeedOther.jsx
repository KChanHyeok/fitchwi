import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import MoveToTop from "../../../components/common/MoveToTop";
import FeedAdd from "../common/FeedAdd";
import Post from "./Post";

const FeedOther = ({ memberInfo }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);

  const obsRef = useRef(null); //observer Element
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  const obsHandler = (entries) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getFeedList = useCallback(async () => {
    setLoading(true);
    await axios
      .get("/getFeedList", {
        params: {
          category: "기타",
          page: page,
        },
      })
      .then((response) => {
        setFeed((prevState) => prevState.concat(response.data));
        if (response.data.length < 5) {
          endRef.current = true;
        }
        preventRef.current = true;
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (page !== 0) {
      getFeedList();
    }
  }, [getFeedList, page]);

  const loadFeed = () => {
    axios
      .get("/getFeedListTillPage", {
        params: {
          category: "all",
          page: page,
        },
      })
      .then((response) => {
        setFeed(response.data);
      });
  };

  return (
    <>
      <Box flex={4} p={2}>
        {loading ? (
          <Box textAlign="center" lineHeight={40}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <></>
        )}
        {feed && (
          <>
            {feed.length === 0 ? (
              <Box textAlign="center" lineHeight={40}>
                👀 작성된 공유해요가 없습니다
              </Box>
            ) : (
              feed.map((data) => (
                <Post
                  key={data.feedCode}
                  tag={data.feedTag}
                  feedClassificationcode={data.feedClassificationcode}
                  information={data}
                  memberWriterInfo={data.memberEmail}
                  feedDate={data.feedDate}
                  feedContent={data.feedContent}
                  feedCode={data.feedCode}
                  file={data.ffList}
                  comment={data.fcList}
                  memberInfo={memberInfo}
                  refreshFeed={loadFeed}
                  like={data.flList}
                />
              ))
            )}
          </>
        )}

        <Box ref={obsRef}></Box>
        <FeedAdd memberInfo={memberInfo} refreshFeed={loadFeed} memberEmail={memberInfo.memberEmail} />
        <MoveToTop />
      </Box>
    </>
  );
};

export default FeedOther;
