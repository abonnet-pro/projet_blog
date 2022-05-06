import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Footer() {

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/')
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        toast.success("Abonnement validé, vous recevrez très prochainement un email de confirmation")
    }

    return(
        <footer className="mt-auto bg-white text-center">
            <div className="container pb-0">
                <section className="mb-4">
                    <i className="pointer bi bi-facebook fs-1 me-3" onClick={ redirect }/>
                    <i className="pointer bi bi-twitter fs-1 me-3" onClick={ redirect }/>
                    <i className="pointer bi bi-instagram fs-1 me-3" onClick={ redirect }/>
                    <i className="pointer bi bi-linkedin fs-1 me-3" onClick={ redirect }/>
                    <i className="pointer bi bi-github fs-1 me-3" onClick={ redirect }/>
                </section>
            </div>

            <div className="container pb-0">
                <section className="">
                    <form action="" onSubmit={ handleSubmit }>
                        <div className="row d-flex justify-content-center">
                            <div className="col-auto">
                                <p className="pt-2">
                                    <strong>Abonnez vous à la newsletter</strong>
                                </p>
                            </div>
                            <div className="col-md-5 col-12">
                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="form5Example29" className="form-control" placeholder="Adresse email"/>
                                </div>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-4">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            <div className="text-center pb-3 bg-white">
                © 2022 Copyright:
                <a className="pointer text-white ps-1">Blogger.com</a>
            </div>
        </footer>
    )
}