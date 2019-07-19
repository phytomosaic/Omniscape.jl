var documenterSearchIndex = {"docs":
[{"location":"#Omniscape.jl-1","page":"Home","title":"Omniscape.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A package to compute omnidirectional landscape connectivity.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Package repository: https://github.com/Circuitscape/Omniscape.jl","category":"page"},{"location":"#","page":"Home","title":"Home","text":"note: Note\nThis package is currently in the early stages of development. Please test it out and post issues to the GitHub repo with any bugs, feature requests, or questions.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using Pkg; Pkg.add(PackageSpec(url = \"https://github.com/Circuitscape/Omniscape.jl\", rev = \"v0.0.2\"))","category":"page"},{"location":"#Overview-1","page":"Home","title":"Overview","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This package implements the omnidirectional connectivity algorithm developed by McRae et al. (2016). Omniscape.jl is a moving window implementation of Circuitscape.jl (Anantharaman et al. 2019). Circuitscape.jl applies circuit theory to make spatially-explicit predictions of connectivity using concepts developed by McRae (2006) and McRae et al. (2008).","category":"page"},{"location":"#References-1","page":"Home","title":"References","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"[1] Anantharaman, R., Hall, K., Shah, V., & Edelman, A. (2019). Circuitscape in Julia: High Performance Connectivity Modelling to Support Conservation Decisions. arXiv preprint arXiv:1906.03542.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"[2] McRae, B. H. (2006). Isolation by resistance. Evolution, 60(8), 1551-1561.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"[3] McRae, B. H., Dickson, B. G., Keitt, T. H., & Shah, V. B. (2008). Using circuit theory to model connectivity in ecology, evolution, and conservation. Ecology, 89(10), 2712-2724.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"[4] McRae, B. H., Popper, K., Jones, A., Schindel, M., Buttrick, S., Hall, K., Unnasch, B. & Platt, J. (2016). Conserving nature’s stage: mapping omnidirectional connectivity for resilient terrestrial landscapes in the Pacific Northwest. The Nature Conservancy, Portland, Oregon.","category":"page"},{"location":"usage/#Usage-1","page":"Usage","title":"Usage","text":"","category":"section"},{"location":"usage/#Running-Omniscape-1","page":"Usage","title":"Running Omniscape","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"To use Omniscape, simply run the following code after Omniscape.jl has be installed.","category":"page"},{"location":"usage/#","page":"Usage","title":"Usage","text":"julia> using Omniscape\njulia> run_omniscape(\"path/to/config/file.ini\")","category":"page"},{"location":"usage/#","page":"Usage","title":"Usage","text":"file.ini is a file specifying input data paths and options for Omniscape. See this link for an example .ini file. The arguments specified in the .ini file are described in detail below.","category":"page"},{"location":"usage/#Arguments-1","page":"Usage","title":"Arguments","text":"","category":"section"},{"location":"usage/#resistance_file-1","page":"Usage","title":"resistance_file","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"The path to the resistance layer input. Currently, the resistance surface must be in ASCII raster format with a NoData value of -9999 and the following header format:","category":"page"},{"location":"usage/#","page":"Usage","title":"Usage","text":"ncols         30\nnrows         30\nxllcorner     0\nyllcorner     0\ncellsize      1\nnodata_value  -9999","category":"page"},{"location":"usage/#","page":"Usage","title":"Usage","text":"This is the format used by both QGIS and ArcMap GIS software.","category":"page"},{"location":"usage/#source_file-1","page":"Usage","title":"source_file","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"The path to the source layer input. The source layer must also be in ASCII raster format, and all values must be geq 0. This raster must have an identical number of rows, columns, lower left corner coordinates, and cellsize as the resistance layer.","category":"page"},{"location":"usage/#radius-1","page":"Usage","title":"radius","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"A positive integer specifying the radius in pixels of the moving window used to identify sources to connect to each target.","category":"page"},{"location":"usage/#buffer-1","page":"Usage","title":"buffer","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"Optional (default = 0). A positive integer specifying an additional buffer distance beyond radius to clip the resistance and source layers to for each moving window iteration. If 0, resistance and source layers will be clipped the a circle of size radius for each moving window iteration.","category":"page"},{"location":"usage/#block_size-1","page":"Usage","title":"block_size","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"An odd, positive integer specifying the side length for source layer blocking in target generation.","category":"page"},{"location":"usage/#source_threshold-1","page":"Usage","title":"source_threshold","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"Optional (default = 0), the minimum value that a pixel must be in the source layer to be included as a source.","category":"page"},{"location":"usage/#project_name-1","page":"Usage","title":"project_name","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"The name of the project to use. This string will be appended as a prefix to all output files.","category":"page"},{"location":"usage/#calc_flow_potential-1","page":"Usage","title":"calc_flow_potential","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"One of true, false. Specify whether to calculate flow potential.","category":"page"},{"location":"usage/#write_raw_currmap-1","page":"Usage","title":"write_raw_currmap","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"One of true, false. Specify whether to save the raw current map (prior to normailization by flow potential) as output.","category":"page"},{"location":"usage/#write_normalized_currmap-1","page":"Usage","title":"write_normalized_currmap","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"One of true, false. Specify whether to save the normalized current map as output. Normalized current is calculated as raw current divided by flow potential.","category":"page"},{"location":"usage/#write_flow_potential-1","page":"Usage","title":"write_flow_potential","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"One of true, false. Specify whether to save the raw flow potential map as output.","category":"page"},{"location":"usage/#parallelize-1","page":"Usage","title":"parallelize","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"One of true, false. Specify whether to use parallel processing.","category":"page"},{"location":"usage/#max_parallel-1","page":"Usage","title":"max_parallel","text":"","category":"section"},{"location":"usage/#","page":"Usage","title":"Usage","text":"A positive integer specifying how many workers should be used for parallel processing.","category":"page"}]
}
