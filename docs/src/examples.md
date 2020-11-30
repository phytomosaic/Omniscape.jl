# Examples

## Forest connectivity in central Maryland

Land cover datasets are commonly used to parameterize resistance for connectivity modeling. This example uses the [National Land Cover Dataset](https://www.usgs.gov/centers/eros/science/national-land-cover-database) for the United States to model forest connectivity in central Maryland. Each value in the categorical land cover dataset is assigned a resistance score. We can have Omniscape.jl assign these values internally by providing a reclassification table (see [Resistance Reclassification](@ref)).

First, install the necessary packages and import them:

```julia
using Pkg; Pkg.add(["Omniscape", "GeoData", "Plots"])
using Omniscape, GeoData, Plots
```
```@setup mdforest
using Pkg; Pkg.add(["Omniscape", "GeoData", "Plots"])
using Omniscape, GeoData, Plots
nothing
```

Next, download the landcover data we'll use in this example, and plot it:

```@example mdforest
url_base = "https://raw.githubusercontent.com/Circuitscape/datasets/main/"
# Download the NLCD tile used to create the resistance surface and load it
download(string(url_base, "data/nlcd_2016_frederick_md.tif"),
         "nlcd_2016_frederick_md.tif")

# Plot the landcover data
values = [11, 21, 22, 23, 24, 31, 41, 42, 43, 52, 71, 81, 82, 90, 95]
palette = ["#476BA0", "#DDC9C9", "#D89382", "#ED0000", "#AA0000",
           "#b2b2b2", "#68AA63", "#1C6330", "#B5C98E", "#CCBA7C",
           "#E2E2C1", "#DBD83D", "#AA7028", "#BAD8EA", "#70A3BA"]

plot(GeoArray(GDALarray("nlcd_2016_frederick_md.tif")),
     title = "Land Cover Type", xlabel = "Easting", ylabel = "Northing",
     seriescolor = cgrad(palette, (values .- 12) ./ 84, categorical = true),
     size = (600, 550))
savefig("nlcd-plot.svg"); nothing # hide
```

<img src='nlcd-plot.svg' width=500><br>

Now, load the array using Omniscape's internal `read_raster()` function or a function from a GIS Julia package of your choice. `read_raster()` returns a tuple with the data array, a wkt string containing geographic projection info, and an array containing geotransform values. We'll use the wkt and geotransform later.

```@example mdforest
land_cover, wkt, transform = Omniscape.read_raster("nlcd_2016_frederick_md.tif", Float64)
```

The next step is to create a resistance reclassification table that defines a resistance value for each land cover value. Land cover values go in the left column, and resistance values go in the right column. In this case, we are modeling forest connectivity, so forest classes receive the lowest resistance score of one. Other "natural" land cover types are assigned moderate values, and human-developed land cover types are assigned higher values. Medium- to high-intensity development are given a value of `missing`, which denotes infinite resistance (absolute barriers to movement).

```@example mdforest
# Create the reclassification table used to translate land cover into resistance
reclass_table = [
    11.	100; # Water
    21	500; # Developed, open space
    22	1000; # Developed, low intensity
    23	missing; # Developed, medium intensity
    24	missing; # Developed, high intensity
    31	100; # Barren land
    41	1; # Deciduous forest
    42	1; # Evergreen forest
    43	1; # Mixed forest
    52	20; # Shrub/scrub
    71	30; # Grassland/herbaceous
    81	200; # Pasture/hay
    82	300; # Cultivated crops
    90	20; # Woody wetlands
    95	30; # Emergent herbaceous wetlands
]
```

Next, we define the configuration options for this model run. See the [Arguments](@ref) section in the [User Guide](@ref) for more information about each of the configuration options.

```@example mdforest
# Specify the configuration options
config = Dict{String, String}(
    "radius" => "100",
    "block_size" => "21",
    "project_name" => "md_nlcd_omniscape_output",
    "source_from_resistance" => "true",
    "r_cutoff" => "1", # Only forest pixels should be sources
    "reclassify_resistance" => "true"
)
```

Finally, compute connectivity using `run_omniscape()`, feeding in the configuration dictionary, the resistance array, the reclass table, as well as the wkt and geotransform information loaded earlier. Passing in the wkt and geotransform, along with `true` for the `write_outputs` argument, will allow Omniscape to write the outputs as properly projected rasters. `run_omniscape` will print some information to the console and show progress, along with an ETA, in the form of a progress bar.

```@example mdforest
output = run_omniscape(config,
                       land_cover,
                       reclass_table = reclass_table,
                       wkt = wkt,
                       geotransform = transform,
                       write_outputs = true)
```

You'll see that outputs are written to a new folder called "md\_nlcd\_omniscape\_output". This is specified by the "project\_name" value in `config` above. The cumulative current map will always be called "cum\_currmap.tif", and it will be located in the output folder.

Now, load the current map back into Julia as spatial data and plot it:

```@example mdforest
current = GDALarray("md_nlcd_omniscape_output/cum_currmap.tif")
plot(current,
     title = "Cumulative Current Flow", xlabel = "Easting", ylabel = "Northing",
     seriescolor = cgrad(:inferno, [0, 0.005, 0.03, 0.06, 0.1, 0.15]),
     size = (600, 550))
savefig("current-plot.svg"); nothing # hide
```

<img src='current-plot.svg' width=500> <br><em>Cumulative current flow representing forest connectivity. Note that areas in white correspond to built up areas (NLCD values of 23 and 24) that act as absolute barriers to movement.</em><br><br>
