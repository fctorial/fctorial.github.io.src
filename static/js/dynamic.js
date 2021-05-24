function swiper_setup() {
  function addToBodyLeft(n) {
    let curr = document.body.style.left ? parseInt(document.body.style.left) : -100;
    document.body.style.left = `${curr + n}vw`
  }
  document.querySelector('#left-sidebar .open').addEventListener('click', () => addToBodyLeft(+100))
  document.querySelector('#left-sidebar .close').addEventListener('click', () => addToBodyLeft(-100))
  document.querySelector('#right-sidebar .open').addEventListener('click', () => addToBodyLeft(-100))
  document.querySelector('#right-sidebar .close').addEventListener('click', () => addToBodyLeft(+100))

  if (navigator.userAgent.indexOf('Firefox') !== -1 && window.getComputedStyle(document.querySelector('.open')).display !== "none") {
    document.querySelectorAll('#left-sidebar li a').forEach(
      el => {
        el.addEventListener('click', () => {
          document.querySelector('#left-sidebar .close').click()
          setTimeout(() => window.location.href = el.href, 300)
        })
      })
  }
}
swiper_setup()

function form_ui_setup() {
  let toast = document.querySelector('#right-sidebar .message');
  let box = document.querySelector('#right-sidebar input[type=email]')
  document.querySelector('#right-sidebar form').addEventListener(
    'submit',
    e => {
      e.preventDefault()
      let body = `subscriber_email=${box.value}`

      toast.textContent = 'Please wait...'
      let req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status !== 200) {
            toast.textContent = `Network Error: ${this.status}`
          } else if (this.responseText === 'INVALID_EMAIL') {
            toast.textContent = 'The provided email address is not valid'
          } else if (this.responseText === 'ALREADY_REGISTERED') {
            toast.textContent = 'The provided email is already registered'
          } else if (this.responseText === 'QUOTA_EXCEEDED') {
            toast.textContent = 'You are doing that too much, please try again later'
          } else if (this.responseText === 'BACKEND_ERROR') {
            toast.textContent = 'Their is something wrong with the backend, please try again tomorrow'
          } else if (this.responseText === 'EMAIL_NOT_SENT') {
            toast.textContent = 'A verification email will be sent to your address in a while, please verify your email address when you recieve it'
          } else if (this.responseText === 'OK') {
            toast.textContent = 'A verification link has been sent to this address, please verify your email address'
          } else {
            toast.textContent = `Unknown error: ${this.responseText}`
          }
        }
      };
      req.open("POST", "/apis/email/register", true);
      req.send(body);
    }
  )
}
form_ui_setup()
