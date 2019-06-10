describe('canary-test', function() {
    //金丝雀测试
    //确保环境变化下 也能正常通过测试
    test('通不过就别玩了', () => {
        expect(true).toBe(true);
    });
});
