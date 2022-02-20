function addNumbers(Num1, Num2) {
    return Num1 + Num2;
}
describe('addNumbers', () => {
    it('adds two numbers', () => {
        expect(addNumbers(2, 2)).toEqual(4);
    });
});
describe('Example test', () => {
    it('equals true', () => {
        expect(false).toEqual(false);
        expect('Fernando').toEqual('Fernando');
    });
});