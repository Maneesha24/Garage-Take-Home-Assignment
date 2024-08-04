import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { InvoiceType } from "./InputForm";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginTop: 50,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  answer: {
    fontSize: 11,
    color: "darkgray",
    fontWeight: 300,
  },
  invoiceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  label: {
    marginRight: 15,
    fontSize: 11,
  },
  logo: {
    width: 40,
    marginBottom: 30,
  },
  mainHeader: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  imageItem: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

type InvoiceTypeProps = {
    data: InvoiceType
}

const Invoice = ({ data }: InvoiceTypeProps) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.mainHeader}>
        <Image
          style={styles.logo}
          src="https://res.cloudinary.com/dl7vudumd/image/upload/v1722811918/logo3.png"
        />
      </View>

      <View style={styles.invoiceContainer}>
        <Text style={styles.title}>Invoice No: </Text>
        <Text style={styles.answer}>{data.id}</Text>
      </View>
      <View style={styles.invoiceContainer}>
        <Text style={styles.title}>Date: </Text>
        <Text style={styles.answer}>
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.title}>Item Brand:</Text>
          <Text style={styles.answer}>{data.itemBrand}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Listing Title:</Text>
          <Text style={styles.answer}>{data.listingTitle}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Description:</Text>
          <Text style={styles.answer}>{data.listingDescription}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Selling Price:</Text>
          <Text style={styles.answer}>${data.sellingPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Can be Shippable:</Text>
          <Text style={styles.answer}>{data.isShippable ? "Yes" : "No"}</Text>
        </View>
      </View>

      {data.imageUrls && (
        <View style={styles.imageContainer}>
          <Text style={styles.title}>Product images:</Text>

          <View style={styles.imageGallery}>
            {data.imageUrls &&
              data.imageUrls.map((image: string, index: number) => (
                <Image key={index} style={styles.imageItem} src={image} />
              ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default Invoice;
