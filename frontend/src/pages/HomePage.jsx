import {
  Container,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product"; // 🛠 Fayl nomi to‘g‘ri bo‘lsin: .js emas .j
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products} = useProductStore()

  useEffect(() => {
    fetchProducts();
     },[fetchProducts]
 )
 console.log("products", products);
 

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Current Products
        </Text>
        <SimpleGrid columns={{base:1,md:2,lg:3,}} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>

        {products.length === 0 ? (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No Products found 🤷‍♂️{" "}
            <Link to="/create">
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create Product
              </Text>
            </Link>
          </Text>
        ) : (
          <Text>✅ Products bor, ularni bu yerda chiqarish kerak.</Text>  
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
