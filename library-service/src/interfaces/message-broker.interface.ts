export interface IEventMessageBroker {
    type: string;
    data: { [key: string]: any };
}