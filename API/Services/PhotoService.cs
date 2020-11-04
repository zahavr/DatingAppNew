﻿using API.Helper;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            Account cloudinaryAccount = new Account
                (
                    config.Value.CloudName,
                    config.Value.ApiKey,
                    config.Value.ApiSecret
                );

            _cloudinary = new Cloudinary(cloudinaryAccount);
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            ImageUploadResult uploadResult = new ImageUploadResult();
            
            if (file.Length > 0)
            {
                Stream stream = file.OpenReadStream();
                ImageUploadParams uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation()
                                                         .Height(500)
                                                         .Width(500)
                                                         .Crop("fill")
                                                         .Gravity("face")
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);

                return uploadResult;
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            DeletionParams deleteParams = new DeletionParams(publicId);

            DeletionResult result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}
