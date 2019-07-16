# Omniscape.jl

| **Documentation**  | **Build Status**|
|:-----------------------------------------------------:|:------------------------------------:|
| [![docs](https://img.shields.io/badge/docs-stable-blue.svg)](https://Circuitscape.github.io/Omniscape.jl/stable) [![docs](https://img.shields.io/badge/docs-dev-blue.svg)](https://Circuitscape.github.io/Omniscape.jl/dev) | [![pipeline](https://gitlab.com/vlandau/Omniscape.jl/badges/master/pipeline.svg)](https://gitlab.com/vlandau/Omniscape.jl/pipelines?scope=branches&page=1) [![codecov](https://codecov.io/gl/vlandau/Omniscape.jl/branch/master/graph/badge.svg)](https://codecov.io/gl/vlandau/Omniscape.jl) |

Omniscape.jl is a Julia package that  provides an open-source, updated version of [Omniscape](https://conservationgateway.org/ConservationByGeography/NorthAmerica/UnitedStates/oregon/science/Documents/McRae_et_al_2016_PNW_CNS_Connectivity.pdf) with improved reliability and speed. Visit https://circuitscape.github.io/Omniscape.jl/stable for documentation.

## Installation
Enter the following into a Julia terminal to install Omniscape.jl v0.0.1. If you would like to install the development version, simply remove `rev = "v0.0.1"` from the command below.
```julia
julia> using Pkg; Pkg.add(PackageSpec(url = "https://github.com/Circuitscape/Omniscape.jl", rev = "v0.0.1"))

```