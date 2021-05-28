function swiper_setup() {
  document.querySelectorAll('.open, .close').forEach(e => e.style.display = 'block')
  document.querySelector('#left-sidebar .open').addEventListener('click', () => {
    let curr = document.querySelector('#left-sidebar')
    let other = document.querySelector('#right-sidebar')
    let body = document.querySelector('body > .first_body_wrapper')
    curr.classList.add('up')
    other.classList.remove('up')
    other.classList.add('down')
    body.style.opacity = 0
  })
  document.querySelector('#left-sidebar .close').addEventListener('click', () => {
    let curr = document.querySelector('#left-sidebar')
    let other = document.querySelector('#right-sidebar')
    let body = document.querySelector('body > .first_body_wrapper')
    curr.classList.remove('up')
    other.classList.remove('down')
    body.style.opacity = 1
  })
  document.querySelector('#right-sidebar .open').addEventListener('click', () => {
    let curr = document.querySelector('#right-sidebar')
    let other = document.querySelector('#left-sidebar')
    let body = document.querySelector('body > .first_body_wrapper')
    curr.classList.add('up')
    other.classList.remove('up')
    other.classList.add('down')
    body.style.opacity = 0
  })
  document.querySelector('#right-sidebar .close').addEventListener('click', () => {
    let curr = document.querySelector('#right-sidebar')
    let other = document.querySelector('#left-sidebar')
    let body = document.querySelector('body > .first_body_wrapper')
    curr.classList.remove('up')
    other.classList.remove('down')
    body.style.opacity = 1
  })

  document.querySelectorAll('#left-sidebar .dialog a').forEach(e => e.addEventListener('click', () => {
    document.querySelector('#left-sidebar .close').click()
  }))
}

swiper_setup()

function form_ui_setup() {
  let toast = document.querySelector('#right-sidebar .message');
  toast.style.display = 'block'
  let box = document.querySelector('#right-sidebar input[type=email]')
  document.querySelector('#right-sidebar form').addEventListener(
    'submit',
    e => {
      e.preventDefault()
      let body = `subscriber_email=${box.value}`

      toast.textContent = 'Please wait...'
      let req = new XMLHttpRequest();
      req.onreadystatechange = function () {
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
