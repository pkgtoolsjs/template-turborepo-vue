import axios from 'axios'

const useHttp = () => {
  const axiosInstance = axios.create({
    baseURL: `${window.location.origin}/api/v1`,
    timeout: 5000
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export { useHttp }
