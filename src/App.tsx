import { Center, Flex, Heading, Image } from "@chakra-ui/react";
import "./App.css";
import InputForm from "./components/InputForm";

function App() {
  return (
    <Center>
      <Flex
        direction="column"
        alignItems="center"
        gap="2"
        width="75%"
      >
        <Image
          src="https://www.withgarage.com/navbar/logo3.svg"
          alt="logo"
          width={50}
          height={20}
        />
        <Heading size="md">Generate Invoice for Garage here</Heading>
        <InputForm />
      </Flex>
    </Center>
  );
}

export default App;
