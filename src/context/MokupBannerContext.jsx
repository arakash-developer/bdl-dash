//create Mokup Banner Context
import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const MokupBannerContext = createContext();

export const MokupBannerProvider = ({ children }) => {
  const [mokupBanners, setMokupBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMokupBanners();
  }, []);

  /**
   * Fetches mokup banners from the server
   * @returns {Promise<void>}
   */
  const getMokupBanners = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/mokupzone-banner");
      if (response.status === 200) {
        setLoading(false);
        setMokupBanners(response.data);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response?.data?.message || error.message,
        duration: 2,
      });
    }
  };

  /**
   * Creates a new mokup banner
   * @param {object} data - Object with the new mokup banner data
   * @param {object} config - Request configuration object
   * @returns {Promise<void>}
   */
  const createMokupBanner = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/mokupzone-banner/",
        data,
        config
      );
      if (response.status === 201) {
        getMokupBanners();
        notification.success({
          duration: 2,
          message: "Mokup banner created successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates a mokup banner
   * Makes a PUT request to the server to update a mokup banner.
   * @param {string} id - The id of the mokup banner to update.
   * @param {object} data - Object with the new mokup banner data.
   * @param {object} config - Request configuration object.
   * @returns {Promise} - A promise of the request.
   */
  const updateMokupBanner = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/mokupzone-banner/${id}`,
        data,
        config
      );
      if (response.status === 200) {
        getMokupBanners();
        notification.success({
          duration: 2,
          message: "Mokup banner updated successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a mokup banner.
   * Makes a DELETE request to the server to delete a mokup banner.
   * @param {string} id - The id of the mokup banner to delete.
   * @returns {Promise} - A promise of the request.
   */
  const deleteMokupBanner = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/mokupzone-banner/${id}`);
      if (response.status === 200) {
        getMokupBanners();
        notification.success({
          duration: 2,
          message: "Mokup banner deleted successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MokupBannerContext.Provider
      value={{
        mokupBanners,
        setMokupBanners,
        createMokupBanner,
        updateMokupBanner,
        deleteMokupBanner,
        loading,
      }}
    >
      {children}
    </MokupBannerContext.Provider>
  );
};

MokupBannerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MokupBannerContext;
