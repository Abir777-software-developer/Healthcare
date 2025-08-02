import React, { useState } from "react";
import {
  ClientOnly,
  IconButton,
  Skeleton,
  Box,
  Flex,
  Input,
  Button,
  Drawer,
  CloseButton,
  Popover,
  Portal,
  PopoverCloseTrigger,
  PopoverHeader,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import { toaster } from "../components/ui/toaster";
import doc from "../assets/doctor.jpg";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
function Homepage() {
  const { toggleColorMode, colorMode } = useColorMode();
  const [open, setopen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [openn, setopenn] = useState(false);
  const { onOpen } = useDisclosure();
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const handlegeminiquery = async () => {
    setAiResponse("");
    const disallowedTopics = ["weather", "sports", "food", "politics"];
    if (
      disallowedTopics.some((topic) => aiQuery.toLowerCase().includes(topic))
    ) {
      setAiResponse(
        "❌ I can only assist with development and roadmap-related questions."
      );

      return;
    }
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [],
        generationConfig: { temperature: 0.7 },
        systemInstruction: {
          parts: [
            {
              text: "You are a helpful and knowledgeable AI assistant focused only on health-related topics. You provide clear, factual, and accessible answers about health, wellness, fitness, diseases, symptoms, treatments, medical terminology, nutrition, and preventive care.You do not give medical diagnoses or personalized treatment advice. You do not answer questions outside the healthcare domain. Encourage users to consult a licensed medical professional for personal medical concerns.",
            },
          ],
        },
      });
      const result = await chat.sendMessage(aiQuery);

      const text = await result.response.text();
      setAiResponse(text);
    } catch (err) {
      setAiResponse("❌ Failed to fetch response from Gemini.");
      console.error(err);
    }
  };

  const handleUpload = async () => {};
  const handlelogout = async () => {
    try {
      await axios.get("/logout", { withCredentials: true }); // or axios.post if you used post
      navigate("/login");
      toaster.create({
        title: "Logged out successfully",
        description: "Logged out",
        type: "info",
        duration: 5000,
        closable: true,
      });
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };
  return (
    <Box
      minH="100vh"
      bg={colorMode === "dark" ? "#e14141" : "#83d0d8"}
      color={colorMode === "dark" ? "white" : "black"}
    >
      <Flex
        justify="space-between"
        align="center"
        px={6}
        py={4}
        boxShadow="md"
        bg={colorMode === "dark" ? "#e13333" : "#4dcddb"}
      >
        <Text fontWeight="bold" fontSize="xl">
          HealthCare
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          Welcome Patients
        </Text>
        <Flex gap={4} align="center">
          <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <IconButton
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              aria-label="Toggle Theme"
            >
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
          </ClientOnly>
          <IconButton
            onClick={handlelogout}
            variant="ghost"
            aria-label="Logout"
          >
            <CiLogout />
          </IconButton>
          <Popover.Root
            open={open}
            onOpenChange={(e) => setopen(e.open)}
            positioning={{ placement: "bottom-end" }}
            colorPalette="blue"
          >
            <Popover.Trigger asChild>
              <IconButton variant="ghost" aria-label="Profile">
                <FaUserCircle />
              </IconButton>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content
                  bg="gray.800"
                  color="white"
                  borderColor="gray.600"
                >
                  <Popover.Arrow />
                  <PopoverCloseTrigger />
                  <PopoverHeader fontWeight="bold">User Info</PopoverHeader>
                  <Popover.Body>
                    <div>
                      <Text>hello</Text>
                    </div>
                    <div>
                      <Text>hi</Text>
                    </div>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between" px={12} py={10}>
        <Box maxW="50%" alignSelf="flex-start" pt={4}>
          <Text fontSize="4xl" fontWeight="bold">
            Welcome to Healthcare
          </Text>
          <Text fontSize="lg" mt={4}>
            Upload your test reports and let us provide you with preliminary
            analysis.
          </Text>
          <Box
            bg={colorMode === "dark" ? "#ea5e5e" : "#2ee3f7"}
            p={10}
            boxShadow="xl"
            borderRadius="2xl"
            mt={10} // Push down a bit for spacing
            ml={4} // Push right slightly
            maxW="800px"
            w="100%"
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={6}
              position="relative"
            >
              <Text fontSize="4xl" fontWeight="bold">
                Upload Test Report
              </Text>
              <Box top={10} right={4} position="relative">
                <FaFileUpload size={100} />
              </Box>
            </Flex>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              mb={4}
            />
            <Button
              colorScheme="teal"
              onClick={handleUpload}
              size="md"
              px={6}
              py={2}
              bg={colorMode === "dark" ? "#ec3d3d" : "teal.600"}
              color="white"
              _hover={{ bg: colorMode === "dark" ? "#e34444" : "teal.700" }}
            >
              Submit Report
            </Button>
          </Box>
        </Box>
        <Box flexShrink={0}>
          <img
            src={doc}
            alt="Doctor Illustration"
            style={{ width: "800px", borderRadius: "20px" }}
          />
        </Box>
        <Drawer.Root
          open={openn}
          onOpenChange={(e) => setopenn(e.open)}
          placement="start"
        >
          <Drawer.Trigger asChild>
            <Flex
              align="center"
              position="fixed"
              bottom="50px"
              left="30px"
              gap={2}
              bg={colorMode === "dark" ? "#f01f1f" : "#29e2f7"}
              px={3}
              py={2}
              borderRadius="full"
              _hover={{ bg: "purple.600", cursor: "pointer" }}
              onClick={onOpen}
            >
              <IconButton
                //position="fixed"
                //bottom="80px"
                //right="30px"
                //left="30px"
                //borderRadius="full"
                //colorScheme="purple"
                size="lg"
                aria-label="AI Assisstant"
                onClick={onOpen}
              >
                <RiGeminiFill />
              </IconButton>
              <Text
                fontWeight="bold"
                color={colorMode === "dark" ? "white" : "black"}
                paddingRight={3}
              >
                Healthcare Assistant
              </Text>
            </Flex>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg={colorMode == "dark" ? "#e95858" : "#68c1cb"}>
                <Drawer.Header>
                  <Drawer.Title
                    className={`font-bold ${
                      colorMode === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Healthcare Assisstant
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Text mb={4}>Ask your Health-related questions here.</Text>
                  <Input
                    placeholder="e.g., What is the Cancer?"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    mb={3}
                    border="2px solid black"
                    bg={colorMode == "dark" ? "#e95858" : "#68c1cb"}
                    color={colorMode === "dark" ? "white" : "black"}
                    borderColor={colorMode === "dark" ? "white" : "black"}
                  />
                  <Button
                    //colorScheme="purple"
                    // size="sm"
                    // onClick={handlegeminiquery}
                    // mb={4}
                    // color={colorMode == "dark" ? "white" : "black"}
                    // bg={colorMode == "dark" ? "#ef3636" : "#46d5e5"}
                    size="sm"
                    onClick={handlegeminiquery}
                    mb={4}
                    color={colorMode === "dark" ? "white" : "black"}
                    bg={colorMode === "dark" ? "#ef3636" : "#46d5e5"}
                    border="1px solid black"
                    borderRadius="md"
                    px={4}
                    py={2}
                    boxShadow="md"
                    _hover={{
                      bg: colorMode === "dark" ? "#d32f2f" : "#2bb3c3",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "scale(0.98)",
                      boxShadow: "sm",
                    }}
                  >
                    Ask
                  </Button>
                  {aiResponse && (
                    <Box
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      bg={colorMode === "dark" ? "#e95858" : "#68c1cb"}
                      color={colorMode == "dark" ? "white" : "black"}
                      fontSize="sm"
                    >
                      {aiResponse}
                    </Box>
                  )}
                </Drawer.Body>

                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
}

export default Homepage;
