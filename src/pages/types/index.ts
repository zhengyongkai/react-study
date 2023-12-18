/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 *
 */
// export type ResponseDetails<T> = Promise<{ data: T; msg: string }>;

export type ResponsePageSize<T> = Promise<{
  data: { pageSize: number; pageNo: number; list: Array<T> };
  msg: string;
}>;

export type Response<T> = Promise<{ data: T; msg: string }>;
