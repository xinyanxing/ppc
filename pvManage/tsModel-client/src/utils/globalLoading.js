export default function globalLoading() {
    if (window.fetchNum === undefined) {
        let _num = 0;
        Object.defineProperty(window, 'fetchNum', {
            get() {
                return _num;
            },
            set(val) {
                _num = val;
                if (_num <= 0) {
                    _num = 0;
                    document.querySelector('#_loading').style.display = 'none';
                } else {
                    document.querySelector('#_loading').style.display = 'block';
                }
            }
        });
    }
}