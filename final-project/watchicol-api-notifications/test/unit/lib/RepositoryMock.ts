export class RepositoryMock<T> {

    public one: T;
    public list: Array<T>;

    public findMock = jest.fn();
    public findOneMock = jest.fn();

    public findByNameAndPassword(...args: Array<any>): Promise<T> {
        this.findMock(args);

        return Promise.resolve(this.one);
    }

    public findOne(...args: Array<any>): Promise<T> {
        this.findOneMock(args);

        return Promise.resolve(this.one);
    }

}
