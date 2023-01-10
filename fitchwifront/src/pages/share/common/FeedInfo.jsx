import axios from "axios";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedInfoModal from "./FeedInfoModal";

const FeedInfo = ({ memberInfo, refreshFeed }) => {
  let { feedCode } = useParams();
  const [feedInfo, setFeedInfo] = useState();
  const nav = useNavigate();

  // 피드 댓글 입력 양식 구성

  const getFeedInfo = useCallback(() => {
    axios
      .get("/getFeedInfo", {
        params: {
          feedCode: feedCode,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === "") {
          alert("존재하지 않는 게시글입니다.");
          nav(-1);
        }
        setFeedInfo(response.data);
      });
  }, [feedCode, nav]);

  useEffect(() => {
    getFeedInfo();
  }, [getFeedInfo]);

  return (
    <>
      {!feedInfo ? (
        <div>로딩중</div>
      ) : (
        <>
          <FeedInfoModal
            feedInfo={feedInfo}
            memberInfo={memberInfo}
            refreshFeed={getFeedInfo}
            key={feedInfo.feedCode}
            tag={feedInfo.feedTag}
            memberWriterInfo={feedInfo.memberEmail}
            feedClassificationcode={feedInfo.feedClassificationcode}
            feedDate={feedInfo.feedDate}
            feedContent={feedInfo.feedContent}
            feedCode={feedInfo.feedCode}
            file={feedInfo.ffList}
            comment={feedInfo.fcList}
            like={feedInfo.flList}
          />
        </>
      )}
    </>
  );
};

export default FeedInfo;
