export type IQueues = "createUsers";

export interface IQueueProvider {
  close(key: IQueues): Promise<void>;
  addJob<T>(key: IQueues, payload: T): Promise<void>;
  processQueue(): Promise<void>;
}

export interface IJobProvider {
  key: IQueues;
  execute: any;
}
