import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedTripApi, getTripApi } from "../../services/tripApi";
import { hideLoader, showLoader } from "../../utils/uiUtil";
import ErrorPage from "../../view/pages/ErrorPage";
import modalStore from "../../store/modalStore";

const TripAccessGuard = ({ children, mode }) => {
  const openLoginModal = modalStore((state) => state.openLoginModal);
  const { tripId, shareToken } = useParams();
  const [tripData, setTripData] = useState(null);
  const [status, setStatus]     = useState("loading");
  const [errorKey, setErrorKey] = useState(null);
  /**
   * 단건 여행 데이터 조회 API 요청
   * @param {} tripId 
   * @param {*} successCallback 
   */
  const requestTripData = async(tripId, successCallback) => {
    try {
      showLoader();
      const result = await getTripApi(tripId);
      if (result) {
        console.log(result.data);
        successCallback?.(result?.data);
        setStatus("success");
      }
    } catch (e) {
      const code = e.response?.status;
      if (code === 401) setErrorKey("UNAUTHORIZED");
      else if (code === 403) setErrorKey("FORBIDDEN");
      else if (code === 404) setErrorKey("NOT_FOUND");
      else setErrorKey("UNKNOWN");

      setStatus("error");
      console.log(e);
    } finally {
      hideLoader();
    }
  }

  /**
   * 단건 여행 데이터 조회 API 요청
   * @param {} shareToken 
   * @param {*} successCallback 
   */
  const requestSharedTripData = async(shareToken, successCallback) => {
    try {
      showLoader();
      const result = await getSharedTripApi(shareToken);
      if (result) {
        successCallback?.(result?.data);
        setStatus("success");
      }
    } catch (e) {
      const code = e.response?.status;
      if (code === 403) setErrorKey("FORBIDDEN");
      else if (code === 404) setErrorKey("NOT_FOUND");
      else setErrorKey("UNKNOWN");

      setStatus("error");
      console.log(e);
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {

    let isMounted = true;
    let result = null;
    switch (mode) {
      case "SHARE": 
        requestSharedTripData(shareToken, setTripData);
        break;
      case "JOIN": 
        requestTripData(tripId, setTripData);
        break;
      default:
        break;
    }

    return () => { isMounted = false; };
  }, [tripId, shareToken, mode]);


  if (status === "error") {
    if (errorKey === "UNAUTHORIZED") {
      openLoginModal();
    }
    else if (errorKey === "FORBIDDEN") {
      return <ErrorPage defaultKey="FORBIDDEN" />;
    }
    return <ErrorPage defaultKey="NOT_FOUND" />;
  }

  // return children(tripData);
  if (tripData) return children(tripData);

};

export default TripAccessGuard;