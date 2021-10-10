import myAxios from './axiosInterceptor';

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({
  url,
  method,
  data,
  params,
}) => {
  try {
    const result = await myAxios({ url: baseUrl + url, method, data, params });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

export default axiosBaseQuery;
