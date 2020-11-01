import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EnhancedTable from "./enhanced-table.component";
import { DatasetData } from "./enhanced-table.component";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    marginTop: "5px",
  },
}));

function createData(
  name: string,
  count: number,
  category: string,
  assignees: string[]
): DatasetData {
  return { name, category, count, assignees };
}

const datasets = [
  createData("Celebrities", 305, "People", [
    "John Smith",
    "Dustin Newman",
    "Mariam Bond",
  ]),
  createData("Trees", 452, "Nature", ["Bob Dilan", "Anny Hoffmann"]),
  createData("Flowers", 262, "Nature", [
    "Mariam Bond",
    "John Smith",
    "Kerry West",
  ]),
  createData("Children", 159, "People", [
    "Anny Hoffmann",
    "Kerry West",
    "Mariam Bond",
  ]),
  createData("Dogs", 356, "Animals", ["Dustin Newman", "Mariam Bond"]),
  createData("Cats", 408, "Animals", ["Kerry West", "Mariam Key"]),
  createData("Dolphins", 237, "Animals", [
    "John Brown",
    "Jane Smith",
    "Mariam Bond",
  ]),
  createData("Garden", 375, "Nature", ["John Smith", "Dustin Newman"]),
  createData("Brands", 518, "Other", ["John Smith", "Kerry West"]),
  createData("Nudes", 392, "People", [
    "Dustin Newman",
    "Mariam Bond",
    "Kerry West",
  ]),
  createData("Cars", 318, "Other", ["John Smith", "Dustin Newman"]),
  createData("Food", 360, "Other", ["Dustin Newman"]),
  createData("Buildings", 437, "Other", [
    "John Smith",
    "Dustin Newman",
    "Alicia Def",
  ]),
];

const tasks = [
  createData("Upload Celebrities", 305, "People", [
    "John Smith",
    "Dustin Newman",
    "Mariam Bond",
  ]),
  createData("Add Trees sets", 452, "Nature", ["Bob Dilan", "Anny Hoffmann"]),
  createData("Remove Flowers Datasets", 262, "Nature", [
    "Mariam Bond",
    "John Smith",
    "Kerry West",
  ]),
  createData("Dogs", 356, "Animals", ["Dustin Newman", "Mariam Bond"]),
  createData("Remove Dolphins", 237, "Animals", [
    "John Brown",
    "Jane Smith",
    "Mariam Bond",
  ]),
  createData("Add 500 Children Photos", 159, "People", [
    "Anny Hoffmann",
    "Kerry West",
    "Mariam Bond",
  ]),
  createData("Create Garden Datasets", 375, "Nature", [
    "John Smith",
    "Dustin Newman",
  ]),
  createData("Download 400 Nude photos from PicsArt", 400, "Animals", [
    "Kerry West",
    "Mariam Key",
  ]),
  createData("Brands", 518, "Other", ["John Smith", "Kerry West"]),
  createData("Nudes", 392, "People", [
    "Dustin Newman",
    "Mariam Bond",
    "Kerry West",
  ]),
  createData("Cars", 318, "Other", ["John Smith", "Dustin Newman"]),
  createData("Food", 360, "Other", ["Dustin Newman"]),
  createData("Buildings", 437, "Other", [
    "John Smith",
    "Dustin Newman",
    "Alicia Def",
  ]),
];

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.main}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Datasets" {...a11yProps(0)} />
            <Tab label="Tasks" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <EnhancedTable rows={datasets} title={"Datasets"} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EnhancedTable rows={tasks} title={"Tasks"} />
        </TabPanel>
      </div>
    </>
  );
}
