import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const MockupZoneContext = createContext();

export const MockupZoneContextProvider = ({ children }) => {
  const [mockupZones, setMockupZones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMockupZone();
  }, []);

  /**
   * Creates a new mockup zone.
   *
   * Makes a POST request to the server to create a new mockup zone.
   *
   * @param {object} data - Object with the new mockup zone data.
   * @param {object} config - Request configuration object.
   * @returns {Promise} - A promise of the request.
   */
  const createMockupZone = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/mockup-zones", data, config);
      if (response.status === 201) {
        setMockupZones([...mockupZones, response.data]);
        notification.success({
          duration: 2,
          message: "MockupZone created successfully!",
        });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches the mockup zones from the server.
   *
   * Makes a GET request to the server to fetch the mockup zones.
   *
   * @returns {Promise} - A promise of the request.
   */
  const getAllMockupZone = async () => {
    try {
      const response = await axios.get("/mockup-zones");
      console.log("API Response:", response.data);
      setMockupZones(response.data);
    } catch (error) {
      console.error("Error fetching mockup zones:", error);
    }
  };

  /**
   * Deletes a mockup zone.
   *
   * Makes a DELETE request to the server to delete a mockup zone.
   *
   * @param {string} id - The id of the mockup zone to delete.
   * @returns {Promise} - A promise of the request.
   */
  const deleteMockupZone = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/mockup-zones/${id}`);
      if (response.status === 200) {
        getAllMockupZone();
        notification.success({
          duration: 2,
          message: "MockupZone deleted successfully!",
        });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };
  /**
   * Updates a mockup zone.
   *
   * Makes a PATCH request to the server to update a mockup zone.
   *
   * @param {string} id - The id of the mockup zone to update.
   * @param {Object} data - The data to be updated.
   * @param {Object} config - The config of the request.
   * @returns {Promise} - A promise of the request.
   */
  const updateMockupZone = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/mockup-zones/${id}`, data, config);
      if (response.status === 200) {
        getAllMockupZone();
        notification.success({
          duration: 2,
          message: "MockupZone updated successfully!",
        });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MockupZoneContext.Provider
      value={{
        mockupZones,
        setMockupZones,
        createMockupZone,
        loading,
        deleteMockupZone,
        updateMockupZone,
        getAllMockupZone,
      }}
    >
      {children}
    </MockupZoneContext.Provider>
  );
};
export default MockupZoneContextProvider;

MockupZoneContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
