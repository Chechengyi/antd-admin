import React from 'react'
import { FormInstance } from 'antd/lib/form'
import { Dispatch } from '../models/connect'
import { getRequest } from '../utils/utils'

type useTableProps = {
  type: string;
  elseValue?: Object;
  page?: number;
  size?: number;
}

export type UseTableInstance = {
  resetData: () => void;
  searchData: (e: Object) => void;
  handlePageChange: (page: number, size: number) => void;
  size: number;
  page: number;
}

const useTable =
  (
    props: useTableProps,
    dispatch: Dispatch,
    form?: FormInstance
  ): [UseTableInstance] => {

    const [page, setPage] = React.useState<number>(() => {
      let params = getRequest()
      return params.page ? Number(params.page) : props.page || 1
    })

    const [size, setSize] = React.useState<number>(props.size || 10)
    const [formValues, setFormValues] = React.useState<Object>({});  //搜索参数

    React.useEffect(() => {
      getData()
    }, [page, size, formValues, props.elseValue])

    const getData = React.useCallback(() => {
      dispatch({
        type: props.type,
        payload: {
          page,
          num: size,
          ...props.elseValue,
          ...formValues
        }
      })
        .then(() => {
          // 改变地址栏参数，加上page页码
          let params: any = getRequest();
          let url = `?page=${page}`;
          // 保留原有的参数
          Object.keys(params).forEach(item => {
            if (item !== 'page') {
              url += '&' + item + '=' + params[item];
            }
          });
          window.history.replaceState(null, null, url);
        })
    }, [page, size, formValues, props.elseValue])

    const resetData = React.useCallback(() => {
      if (form) {
        form.resetFields()
      }
      setPage(1);
      setFormValues({});
    }, [form])

    const searchData = React.useCallback((data) => {
      setPage(1);
      setFormValues(data);
    }, []);

    const handlePageChange = React.useCallback((page: number, size: number) => {
      setPage(page);
      setSize(size);
    }, []);

    return [{
      page,
      size,
      searchData,
      resetData,
      handlePageChange
    }]
}

export default useTable