import { useState } from "react";
import Invoice from "./Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export type InvoiceType = {
  id: string;
  createdAt: string;
  itemBrand: string;
  listingDescription: string;
  listingTitle: string;
  sellingPrice: string;
  isShippable: boolean;
  imageUrls: string[];
};

const InputForm = () => {
  const [url, setUrl] = useState("");
  const [listingData, setListingData] = useState<InvoiceType>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const extractUUID = () => {
      const parts = url.split("/");
      return parts[parts.length - 1];
    };

    const response = await fetch(
      `https://garage-backend.onrender.com/getListing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: extractUUID() }),
      }
    );
    const responseData = await response.json();
    setListingData(responseData.result.listing);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          mt="5"
          gap="2"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <InputGroup minW={500}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter listing URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </InputGroup>

          <Button type="submit" colorScheme="gray">
            <SearchIcon />
          </Button>
        </Flex>
      </form>
      {listingData && (
        <PDFDownloadLink
          document={<Invoice data={listingData} />}
          fileName="Garage_Invoice.pdf"
        >
          {({ loading }: { loading: boolean }) => (
            <Button
              colorScheme="orange"
              disabled={loading}
              loadingText="Generating PDF"
            >
              Download
            </Button>
          )}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default InputForm;
