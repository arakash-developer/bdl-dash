//create Recent works Context
import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const MokupBannerContext = createContext();

export const MokupBannerContextProvider = ({ children }) => {
  const [mokupBanner, setMokupBanner] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecentWorksBanner();
  }, []);

  /**
   * Fetches recent works from the server
   * @returns {Promise<void>}
   */
  const getRecentWorksBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/mokupzone-banner");
      setMokupBanner(response.data);
    } catch (error) {
      console.error("Get banner error:", error.response?.data || error.message);
      notification.error({
        message: "Failed to fetch banners",
        description: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new recent work
   * @param {object} data - Object with the new recent work data
   * @param {object} config - Request configuration object
   * @returns {Promise<void>}
   */
  const createMokupBanner = async (data, config) => {
    setLoading(true);
    try {
      // Log the FormData contents for debugging
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post("/mokupzone-banner", data, {
        ...config,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        await getRecentWorksBanner();
        notification.success({
          message: "Banner created successfully!",
          duration: 2,
        });
        return response;
      }
    } catch (error) {
      console.error("Create banner error details:", {
        data: Object.fromEntries(data),
        error: error.response?.data || error.message,
      });
      notification.error({
        message: "Failed to create banner",
        description:
          error.response?.data?.message || "Please check all required fields",
        duration: 2,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a recent work.
   * Makes a DELETE request to the server to delete a recent work.
   * @param {string} id - The id of the recent work to delete.
   * @returns {Promise} - A promise of the request.
   */

  const deleteRecentWorkBanner = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/mokupzone-banner/${id}`);
      if (response.status === 200) {
        await getRecentWorksBanner();
        notification.success({
          message: "Banner deleted successfully!",
          duration: 2,
        });
      }
    } catch (error) {
      console.error(
        "Delete banner error:",
        error.response?.data || error.message
      );
      notification.error({
        message: "Failed to delete banner",
        description: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRecentWorkBanner = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/mokupzone-banner/${id}`,
        data,
        config
      );
      if (response.status === 200) {
        await getRecentWorksBanner();
        notification.success({
          message: "Banner updated successfully!",
          duration: 2,
        });
      }
    } catch (error) {
      console.error(
        "Update banner error:",
        error.response?.data || error.message
      );
      notification.error({
        message: "Failed to update banner",
        description: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MokupBannerContext.Provider
      value={{
        mokupBanner,
        setMokupBanner,
        createMokupBanner,
        updateRecentWorkBanner,
        deleteRecentWorkBanner,
        loading,
      }}
    >
      {children}
    </MokupBannerContext.Provider>
  );
};

export default MokupBannerContext;

MokupBannerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
