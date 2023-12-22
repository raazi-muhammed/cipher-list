export enum PriorityTypes {
    NONE = 0,
    LOW = 1,
    MEDIUM,
    HIGH,
}
export type TodoItem = {
    id: string;
    name: string;
    checked: boolean;
    priority: PriorityTypes;
    doWhen: string | null;
    createdAt: string;
};
