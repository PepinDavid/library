export interface IMessage<T = unknown> {
  type: string;
  data: T;
}

export interface IRabbitMQService {
  publish<T>(queue: string, message: IMessage<T>): Promise<void>;
  consume(
      queue: string,
      exchange: string,
      routingKey: string,
      handler: (msg: unknown) => void,
      exchangeType: 'topic' | 'direct' | 'fanout',
  ): Promise<void>;
}
