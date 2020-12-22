/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
export default function createSearch() {
  const input = document.querySelector('.search-imput');

  input.oninput = function () {
    const value = this.value.trim();
    const allLi = document.querySelectorAll('.country__item');

    if (value !== '') {
      allLi.forEach((element) => {
        if (element.innerText.search(value) === -1) {
          element.classList.add('hide');
        } else {
          element.classList.remove('hide');
        }
      });
    } else {
      allLi.forEach((element) => {
        element.classList.remove('hide');
      });
    }
  };
}
