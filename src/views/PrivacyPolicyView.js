import React from 'react'
import MetaTags from "../components/MetaTags";

const PrivacyPolicyView = () => {
    return (
        <>
            <MetaTags
                title="Euro-jamniki.pl - polityka prywatności"
                description="Zapoznaj się z polityką prywatności serwisu euro-jamniki.pl."
            />
            <div className="privacy-policy">
                <div className="container py-3">
                    <div>
                        <h3>Polityka prywatności</h3>
                        <div className="mt-3">
                            <div>
                                <h4 className="h4">Postanowienia ogólne</h4>
                                <p>1.1. Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych
                                    użytkowników strony internetowej (dalej „Serwis”).</p>
                                <p>1.2. Właściciel Serwisu dokłada wszelkich starań, aby dane osobowe przetwarzane były
                                    zgodnie z przepisami prawa oraz w sposób zapewniający ich bezpieczeństwo.</p>

                                <h4 className="h4">Rodzaje przetwarzanych danych</h4>
                                <p>2.1. Serwis zbiera dane osobowe użytkowników w celach statystycznych. Dane te obejmują
                                    m.in. adres IP użytkownika, typ przeglądarki, język przeglądarki, datę i czas wizyty.
                                    Wyjątkiem są dane podane podczas rejestracji na Serwisie - trzymane oraz
                                    wykorzystywane one są w celu zapewnienia prawidłowego działania Serwisu dla użytkownika
                                    danego konta.</p>
                                <p>2.2. Wysyłając mail z prośbą o kontakt użytkownik wyraża zgodę na otrzymanie informacji
                                    zwrotnej od Administratora (Wojciech Guze, email: wojciechguze2@gmail.com).

                                </p><h4 className="h4">Cel i podstawa przetwarzania danych</h4>
                                <p>3.1. Dane osobowe przetwarzane są w celu zapewnienia poprawnego działania Serwisu.</p>
                                <p>3.2. Podstawą przetwarzania danych osobowych jest zgoda użytkownika wyrażona poprzez
                                    korzystanie z Serwisu.</p>

                                <h4 className="h4">Udostępnianie danych osobowych</h4>
                                <p>4.1. Serwis nie udostępnia danych osobowych użytkowników żadnym podmiotom trzecim, z
                                    wyjątkiem przypadków przewidzianych przepisami prawa.</p>
                                <p>4.2. Serwis może udostępniać dane zbiorcze, nieidentyfikujące użytkowników, w celu
                                    przeprowadzania analiz statystycznych i marketingowych.</p>

                                <h4 className="h4">Prawa użytkowników</h4>
                                <p>5.1. Użytkownik ma prawo dostępu do swoich danych osobowych oraz do ich sprostowania lub
                                    usunięcia.</p>
                                <p>5.2. Użytkownik ma prawo do ograniczenia przetwarzania swoich danych osobowych oraz do
                                    wniesienia sprzeciwu wobec ich przetwarzania.</p>
                                <h4 className="h4">Okres przetwarzania danych</h4>
                                <p>6.1. Serwis podejmuje wszelkie niezbędne środki, aby chronić dane osobowe użytkowników
                                    przed nieuprawnionym dostępem.</p>

                                <h4 className="h4">Kontakt z administratorem</h4>
                                <p>7.1. W sprawach związanych z przetwarzaniem danych osobowych użytkownik może kontaktować
                                    się z administratorem pod adresem e-mail: <b>wojciechguze2@gmail.com</b>.</p>
                                <h4 className="h4">Postanowienia końcowe</h4>
                                <p>8.1. Serwis zastrzega sobie prawo do zmiany niniejszej Polityki Prywatności w każdym
                                    czasie.</p>
                                <p>8.2. W przypadku wprowadzenia zmian w Polityce Prywatności, Serwis poinformuje o tym
                                    użytkowników za pośrednictwem komunikatu na stronie internetowej.</p>
                                <p>8.3. W przypadku dalszego korzystania z Serwisu po wprowadzeniu zmian w Polityce
                                    Prywatności, użytkownik wyraża zgodę na zmienioną Politykę Prywatności.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicyView
