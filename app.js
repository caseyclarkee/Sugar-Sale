(function(){
  const e = React.createElement;

  function encode(data){
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  function RegisterForm(){
    const [state, setState] = React.useState({ name:'', email:'' });
    const [submitted, setSubmitted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    function onChange(evt){
      setState(s => ({ ...s, [evt.target.name]: evt.target.value }));
    }

    async function onSubmit(evt){
      evt.preventDefault();
      setLoading(true);
      setError('');
      try{
        const formData = { 'form-name': 'interest', ...state };
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type':'application/x-www-form-urlencoded' },
          body: encode(formData)
        });
        setSubmitted(true);
      }catch(err){
        console.error(err);
        setError('Something went wrong. Please try again.');
      }finally{
        setLoading(false);
      }
    }

    if(submitted){
      return e('div', { className: 'form-card' },
        e('h2', { className:'form-title success' }, 'You’re in!'),
        e('p', null, 'We’ll let you know when the sale drops.' )
      );
    }

    return e('form', { className:'form-card', name:'interest', 'data-netlify': 'true', onSubmit },
      e('h2', { className:'form-title' }, 'Register your interest'),
      e('div', { className:'form-grid' },
        e('input', { className:'input', type:'text', name:'name', placeholder:'Name', required:true, value:state.name, onChange }),
        e('input', { className:'input', type:'email', name:'email', placeholder:'Email', required:true, value:state.email, onChange }),
        error ? e('small', { className:'muted' }, error) : null,
        e('button', { className:'cta', type:'submit', disabled:loading }, loading ? 'Sending…' : 'Notify Me')
      )
    );
  }

  function App(){
    return e('div', { className:'container' },
      e('div', { className:'bg-x' },
        e('img', { src:'./images/big-x.png', alt:'Yellow X background' })
      ),
      e('div', { className:'content' },
        e('img', { className:'logo', src:'./images/sugar-lockup.png', alt:'Sugar Liquidation Sale' }),
        e('h1', null, 'Coming soon!'),
        e(RegisterForm)
      )
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(e(App));
})();