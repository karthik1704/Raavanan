import myAxios from './axiosInterceptor';

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({
  url,
  method,
  data,
}) => {
  try {
    const result = await myAxios({ url: baseUrl + url, method, data });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

export default axiosBaseQuery;
