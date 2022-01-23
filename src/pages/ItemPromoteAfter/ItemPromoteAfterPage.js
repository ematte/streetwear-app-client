import { withRouter } from "react-router-dom"

import { route } from "../../utils"

import { PageContainer } from "../../components/Containers"
import PageHeading from "../../components/PageHeading"
import HelmetBasics from "../../components/HelmetBasics"

import { StyledLink, Text } from "./ItemPromoteAfterPage.styles"

const ItemPromoteAfter = withRouter(({ location }) => {
  const searchParams = new URLSearchParams(location.search)
  const hasError = searchParams.has("error") && searchParams.get("error") === "501"

  return (
    <PageContainer>
      {hasError ? (
        <>
          <PageHeading emoji={"❌"}>Wystąpił błąd</PageHeading>

          <HelmetBasics fullTitle="Wystąpił błąd" />

          <Text>
            Transakcja zakończyła się niepowodzeniem. W razie pytań co do transakcji{" "}
            <StyledLink to={route("CONTACT")}>skontaktuj się z nami</StyledLink> podając numer
            transakcji, który otrzymałeś w mailu od PayU. Postaramy się odpowiedzieć na wszelkie
            pytania i rozwiązać ten problem.
          </Text>
        </>
      ) : (
        <>
          <PageHeading emoji={"🎉"}>Dzięki za zakup</PageHeading>

          <HelmetBasics fullTitle="Dzięki za zakup" />

          <Text>
            Gdy tylko wpłata zostanie zaksięgowana, twoje ogłoszenie otrzyma wszystkie benefity.
            Może to potrwać do 5 minut. Status promowania ogłoszenia możesz sprawdzić na{" "}
            <StyledLink to={route("MY_ACCOUNT")}>swoim profilu</StyledLink>.
          </Text>
          <Text>
            Jeśli po 5 minutach twoje ogłoszenie nie otrzyma wszystkich benefitów,{" "}
            {/* TODO: research how long it might take (particularly on weekends etc.) and make sure the copy represents that */}
            <StyledLink to={route("CONTACT")}>napisz do nas</StyledLink> podając numer transakcji,
            który otrzymałeś w mailu od PayU.
          </Text>
        </>
      )}
    </PageContainer>
  )
})

export default ItemPromoteAfter
